// 'use client';

// import { createContext, useContext, useEffect, useState, useCallback } from 'react';
// import { getCookie, setCookie, deleteCookie } from 'cookies-next';
// import userbackAxios from '@/lib/userbackAxios';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [authInitialized, setAuthInitialized] = useState(false);

//   // 🔹 load auth once (refresh / first load)
//   const loadAuth = useCallback(async () => {
//     const cookieToken = getCookie('token');

//     if (!cookieToken) {
//       setToken(null);
//       setCurrentUser(null);
//       setAuthInitialized(true);
//       return;
//     }

//     try {
//       setToken(cookieToken);
//       const res = await userbackAxios.get('/user/profile');
//       setCurrentUser(res.data?.data || res.data);
//     } catch {
//       deleteCookie('token', { path: '/' });
//       deleteCookie('currentUser', { path: '/' });
//       setToken(null);
//       setCurrentUser(null);
//     } finally {
//       setAuthInitialized(true);
//     }
//   }, []);

//   useEffect(() => {
//     loadAuth();
//   }, [loadAuth]);

//   // 🔥 LOGIN (INSTANT UI UPDATE)
//   const handleLoginSuccess = (token, user) => {
//     setToken(token);
//     setCurrentUser(user);

//     setCookie('token', token, { path: '/' });
//     setCookie('currentUser', JSON.stringify(user), { path: '/' });
//   };

//   // 🔥 LOGOUT (INSTANT UI UPDATE)
//   const handleLogOut = () => {
//     deleteCookie('token', { path: '/' });
//     deleteCookie('currentUser', { path: '/' });

//     setToken(null);
//     setCurrentUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         currentUser,
//         authInitialized,
//         handleLoginSuccess,
//         handleLogOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // 🔹 Hook
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error('useAuth must be used inside <AuthProvider>');
//   }
//   return ctx;
// }

'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { getAccessToken, setAccessToken, clearAccessToken } from '@/lib/authToken';
import { refreshAccessToken } from '@/lib/setupAuthInterceptors';
import { installGlobalAxiosAuth } from '@/lib/globalAxiosAuth';
import userbackAxios from '@/lib/userbackAxios';

// Install the global raw-axios auth safety net once (client only).
installGlobalAxiosAuth();

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // 🔹 Restore session on load.
  // The access token lives only in memory, so after a reload we re-mint one
  // from the httpOnly refresh cookie. `currentUser` cookie gives us the role
  // for instant UI; the refresh response is the source of truth.
  const loadAuth = useCallback(async () => {
    const cookieUser = getCookie('currentUser');

    // No prior session marker → don't bother hitting /refresh.
    if (!cookieUser) {
      clearAccessToken();
      setToken(null);
      setCurrentUser(null);
      setAuthInitialized(true);
      return;
    }

    // Already have an access token in memory (post-login / SPA nav) → no refresh.
    const existing = getAccessToken();
    if (existing) {
      setToken(existing);
      try {
        setCurrentUser(JSON.parse(cookieUser));
      } catch {
        setCurrentUser(null);
      }
      setAuthInitialized(true);
      return;
    }

    try {
      const { token: newToken, user } = await refreshAccessToken();
      setToken(newToken);
      const resolvedUser = user || JSON.parse(cookieUser);
      setCurrentUser(resolvedUser);
      setCookie('currentUser', JSON.stringify(resolvedUser), {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 20, // 20 days, matches the refresh token
      });
    } catch {
      // Refresh failed (expired/revoked) → fully signed out.
      clearAccessToken();
      deleteCookie('currentUser', { path: '/' });
      deleteCookie('token', { path: '/' }); // legacy cleanup
      setToken(null);
      setCurrentUser(null);
    } finally {
      setAuthInitialized(true);
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  // 🔥 LOGIN — store access token in memory; only the user info is cookied.
  const handleLoginSuccess = (newToken, user) => {
    setAccessToken(newToken);
    setToken(newToken);
    setCurrentUser(user);

    setCookie('currentUser', JSON.stringify(user), {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 20, // 20 days, matches the refresh token
    });
    deleteCookie('token', { path: '/' }); // remove any legacy JS-readable access token cookie
  };

  // 🔥 LOGOUT — revoke the refresh token server-side, then clear local state.
  const handleLogOut = async () => {
    try {
      await userbackAxios.post('/user/logout');
    } catch {
      // ignore network errors on logout
    }
    clearAccessToken();
    deleteCookie('currentUser', { path: '/' });
    deleteCookie('token', { path: '/' });
    setToken(null);
    setCurrentUser(null);

    // Hard-redirect to home so any protected page is left immediately and all
    // in-memory/per-hook auth state is fully reset (no manual refresh needed).
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        authInitialized,
        handleLoginSuccess,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
