'use client';

import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/partials/loading/Loader';

export default function AuthGate({ children }) {
  const { authInitialized } = useAuth();

  if (!authInitialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );
  }

  return children;
}
