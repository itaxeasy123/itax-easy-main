'use client';

import { Suspense } from 'react';
import Loader from '@/components/partials/loading/Loader';

export default function ClientWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-[70vh] justify-center items-center">
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
