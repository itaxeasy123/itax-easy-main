// Global auth safety-net for RAW `axios.*` calls (not axios instances).
//
// Many components call the backend with the default axios export and attach the
// token manually. Under the in-memory-token system those manual reads are stale,
// so this installs a single global interceptor that — ONLY for requests to our
// backend origin — overrides the Authorization header with the current in-memory
// access token and transparently refreshes once on a 401.
//
// Axios instances created via axios.create() (userbackAxios, nodeAxios, …) have
// their own interceptors and are unaffected by this global one.

import axios from 'axios';
import { getAccessToken } from './authToken';
import { refreshAccessToken } from './setupAuthInterceptors';

const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL).origin;
  } catch {
    return '';
  }
})();

function targetsOurApi(config) {
  if (!config || !API_ORIGIN) return false;
  const url = `${config.baseURL || ''}${config.url || ''}`;
  return url.startsWith(API_ORIGIN);
}

let installed = false;

export function installGlobalAxiosAuth() {
  if (installed || typeof window === 'undefined') return;
  installed = true;

  axios.interceptors.request.use((config) => {
    if (targetsOurApi(config)) {
      const token = getAccessToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error?.config;
      const status = error?.response?.status;
      const isRefreshCall = original?.url?.includes('/user/refresh');

      if (
        status === 401 &&
        original &&
        targetsOurApi(original) &&
        !original._retry &&
        !isRefreshCall
      ) {
        original._retry = true;
        try {
          const { token } = await refreshAccessToken();
          if (token) {
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${token}`;
            return axios(original);
          }
        } catch {
          // refresh failed — fall through to reject
        }
      }
      return Promise.reject(error);
    },
  );
}
