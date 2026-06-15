'use client';
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/partials/loading/Loader';
import Admin_Dashboard from '@/components/pagesComponents/dashboard/admin/mainBoard/Admin_dashboard';
import SuperAdmin_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/mainBoard/SuperAdmin_dashboard';
import Normal_dashboard from '@/components/pagesComponents/dashboard/normal/mainBoard/Normal_dashboard';

export default function DashboardPage() {
  const { currentUser, authInitialized } = useAuth();

  if (!authInitialized) {
    return <Loader />;
  }

  if (!currentUser) {
    return null; 
  }

  switch (currentUser.userType) {
    case 'superadmin':
      return <SuperAdmin_Dashboard />;

    case 'admin':
      return <Admin_Dashboard />;

    default:
      return <Normal_dashboard />;
  }
}
