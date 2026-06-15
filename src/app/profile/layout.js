
'use client';
import { useEffect, useRef } from 'react';
import userAxios from '@/lib/userbackAxios';
import { BusinessProvider } from '@/context/BusinessContext'; // ✅ ADD THIS

export default function ProfileLayout({ children }) {
  const isMountedRef = useRef(true);
  const prefetchControllerRef = useRef(null);

  useEffect(() => {
    // Page markers
    window._isSpecialPage = true;
    window._pageType = 'profile';

    document.documentElement.classList.add(
      'optimize-performance',
      'profile-page'
    );

    prefetchControllerRef.current = new AbortController();

    const prefetchData = async () => {
      try {
        await userAxios.get('/user/profile', {
          signal: prefetchControllerRef.current.signal,
        });
      } catch (err) {
        if (err?.name !== 'CanceledError' && isMountedRef.current) {
          console.debug('Profile prefetch skipped:', err?.message);
        }
      }
    };

    prefetchData();

    return () => {
      document.documentElement.classList.remove(
        'optimize-performance',
        'profile-page'
      );
      window._isSpecialPage = false;
      window._pageType = '';

      isMountedRef.current = false;

      if (prefetchControllerRef.current) {
        try {
          prefetchControllerRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // ✅ ONLY IMPORTANT CHANGE IS HERE
  return (
    <BusinessProvider>
      <div className="profile-container">{children}</div>
    </BusinessProvider>
  );
}
