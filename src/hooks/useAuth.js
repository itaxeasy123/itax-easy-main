'use client';

import { useRouter } from 'next/navigation';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useState, useEffect, useCallback } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import { getAccessToken, setAccessToken, clearAccessToken } from '@/lib/authToken';
import { refreshAccessToken } from '@/lib/setupAuthInterceptors';

export default function useAuth() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // 🔹 Restore session on load: the access token lives in memory, so re-mint it
  // from the httpOnly refresh cookie. `currentUser` cookie marks a prior session.
  const loadAuth = useCallback(async () => {
    const cookieUser = getCookie('currentUser');

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
      clearAccessToken();
      deleteCookie('currentUser', { path: '/' });
      deleteCookie('token', { path: '/' });
      setToken(null);
      setCurrentUser(null);
    } finally {
      setAuthInitialized(true);
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  // 🔥 LOGIN — access token in memory; only user info is cookied.
  const handleLoginSuccess = (newToken, user) => {
    setAccessToken(newToken);
    setToken(newToken);
    setCurrentUser(user);

    setCookie('currentUser', JSON.stringify(user), {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 20, // 20 days, matches the refresh token
    });
    deleteCookie('token', { path: '/' });
  };

  // 🔥 LOGOUT — revoke refresh token server-side, then clear local state.
  const handleLogOut = async () => {
    try {
      await userbackAxios.post('/user/logout');
    } catch {
      // ignore
    }
    clearAccessToken();
    deleteCookie('currentUser', { path: '/' });
    deleteCookie('token', { path: '/' });
    setToken(null);
    setCurrentUser(null);
    router.replace('/login');
  };

  return {
    token,
    currentUser,
    authInitialized,
    handleLoginSuccess,
    handleLogOut,
  };
}
