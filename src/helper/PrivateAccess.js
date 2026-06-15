// import { redirect, notFound } from 'next/navigation';
// import { cookies } from 'next/headers';
// import { USER_ROLES } from '@/utils/globals';

// export default function PrivateRoute(props) {
//   const cookieStore = cookies();
//   const currentUser = cookieStore.get('currentUser') || '';
//   const { userType} = JSON.parse(currentUser.value || '{}');
//   const { Normal, Admin, SuperAdmin } = props;

//   let Component;

//   switch (userType) {
//     case USER_ROLES.normal:
//       Component = Normal;
//       break;
//     case USER_ROLES.admin:
//       Component = Admin;
//       break;
//     case USER_ROLES.superAdmin:
//       Component = SuperAdmin;
//       break;
//     default:
//       return redirect('/login');
//   }

//   if (!Component) {
//     return notFound();
//   }

//   return <Component />;
// }


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/partials/loading/Loader';

export default function PrivateRoute({
  SuperAdmin,
  Admin,
  Normal,
}) {
  const router = useRouter();
  const { token, currentUser, authInitialized } = useAuth();

  // 🔐 redirect only AFTER auth ready
  useEffect(() => {
    if (!authInitialized) return;

    if (!token) {
      router.replace('/login');
    }
  }, [authInitialized, token, router]);

  // ⛔ wait for auth
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // ⛔ redirect already triggered
  if (!token) return null;

  // ✅ role-based render
  switch (currentUser?.userType) {
    case 'superadmin':
      return SuperAdmin ? <SuperAdmin /> : null;
    case 'admin':
      return Admin ? <Admin /> : null;
    default:
      return Normal ? <Normal /> : null;
  }
}
