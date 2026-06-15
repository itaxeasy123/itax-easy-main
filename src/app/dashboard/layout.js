'use client';
import './dashboard.css';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/partials/loading/Loader';

export default function DashboardRootLayout({ children }) {
  const { currentUser, authInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Once auth has resolved, bounce unauthenticated visitors to login.
  // (loadAuth clears any stale currentUser cookie when the refresh fails, so
  // currentUser is reliably null when there's no real session.)
  useEffect(() => {
    if (authInitialized && !currentUser) {
      const redirect = encodeURIComponent(pathname || '/dashboard');
      router.replace(`/login?redirect=${redirect}`);
    }
  }, [authInitialized, currentUser, pathname, router]);

  // Don't render protected content until we know the auth state.
  if (!authInitialized) {
    return <Loader />;
  }

  // Not authenticated → redirect is in flight, render nothing.
  if (!currentUser) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
