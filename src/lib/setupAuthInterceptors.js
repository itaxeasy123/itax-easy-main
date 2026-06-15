import axios from 'axios';
import { getAccessToken, setAccessToken, clearAccessToken } from './authToken';

const REFRESH_URL = `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`;

// Shared single-flight refresh: concurrent 401s wait on one /refresh call.
let refreshPromise = null;

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(REFRESH_URL, {}, { withCredentials: true })
      .then((res) => {
        const t = res?.data?.data?.token || null;
        setAccessToken(t);
        return { token: t, user: res?.data?.data?.user || null };
      })
      .catch((err) => {
        clearAccessToken();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// Attach the in-memory bearer token on requests, and auto-refresh once on 401.
export function setupAuthInterceptors(instance) {
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error?.config;
      const status = error?.response?.status;
      const isRefreshCall = original?.url?.includes('/user/refresh');

      if (status === 401 && original && !original._retry && !isRefreshCall) {
        original._retry = true;
        try {
          const { token } = await refreshAccessToken();
          if (token) {
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${token}`;
            return instance(original);
          }
        } catch {
          // refresh failed — fall through to reject below
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
