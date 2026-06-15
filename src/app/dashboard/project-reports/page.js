import SuperAdminProjectReports from '@/components/pagesComponents/dashboard/superAdmin/projectReports/ProjectReports';
import { cookies } from 'next/headers';

const page = () => {
  const cookieStore = cookies();
  const currentUser = cookieStore.get('currentUser') || '';
  const { userType } = JSON.parse(currentUser.value || '{}');

  if (userType === 'superadmin' || userType === 'admin') {
    return <SuperAdminProjectReports />;
  }

  return (
    <div className="p-6 md:p-10 text-center text-gray-500">
      You are not authorized to view this page.
    </div>
  );
};

export default page;
