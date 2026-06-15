
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
// import useAuth from '@/hooks/useAuth';
import { useAuth } from '@/context/AuthContext';
import { DashboardSidebarItemsData } from './staticData';
import SideBar from '@/components/pagesComponents/dashboard/sidebar/SideBar';
import BackButton from '@/components/pagesComponents/dashboard/BackButton';
import Loader from '@/components/partials/loading/Loader';
import { Icon } from '@iconify/react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  // const { currentUser, authInitialized } = useAuth();
  const { currentUser, authInitialized } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
    // On mobile the sidebar is an overlay drawer — close it after every
    // navigation (and on first load) so it never covers the page content.
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  // ⛔ WAIT UNTIL AUTH READY
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  /* 🔥 INVOICE ROUTE FULL EXIT — NOT TOUCHED */
  // if (pathname.startsWith('/dashboard/accounts/invoice')) {
  //   return <>{children}</>;
  // }

  // ✅ DB ENUM VALUE (LOWERCASE)
  const role = currentUser?.userType; // admin | normal | agent | superadmin

  // ✅ ROLE → SIDEBAR (ENUM SAFE)
  let sidebarData = DashboardSidebarItemsData.normal;

  if (role === 'admin') {
    sidebarData = DashboardSidebarItemsData.admin;
  } 
  else if (role === 'superadmin') {
    sidebarData = DashboardSidebarItemsData.superAdmin;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
      {isNavigating && (
        <div className="fixed inset-0 z-50 bg-white/60 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <SideBar
        data={sidebarData}
        userType={role}
        isSidebarOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen(p => !p)}
        setIsNavigating={setIsNavigating}
        topOffset="3.6rem"
      />

      <main
        className={`pt-4 px-4 transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        {/* Mobile: button to open the sidebar drawer (desktop has the inline toggle) */}
        <div className="mb-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition active:scale-95"
            aria-label="Open menu"
          >
            <Icon icon="mdi:menu" className="text-lg text-blue-600" />
            Menu
          </button>
        </div>
        <BackButton />
        {children}
      </main>
    </div>
  );
}
