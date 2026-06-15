// In-memory access token store.
// The access token is intentionally NOT persisted to localStorage or a
// JS-readable cookie — keeping it in a module variable is the most
// XSS-resistant option. It's restored on reload via the httpOnly refresh
// cookie (see AuthContext -> /user/refresh).

let accessToken = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (t) => {
  accessToken = t || null;
};
export const clearAccessToken = () => {
  accessToken = null;
};
