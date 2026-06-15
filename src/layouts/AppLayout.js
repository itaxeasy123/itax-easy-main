'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/partials/topNavbar/Navbar';
import Footer from '@/components/partials/footer/Footer';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/partials/loading/Loader';

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { authInitialized } = useAuth();

  // ✅ FIXED (no blank screen)
  if (!authInitialized) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  const noFooter =
    /^\/(login|signup|verify-otp|reset-password)/.test(pathname) ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile');

  return (
    <>
      <Navbar />
      {children}
      {!noFooter && <Footer />}
    </>
  );
}