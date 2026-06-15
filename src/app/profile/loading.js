'use client';

import { ArrowLeft } from 'lucide-react';

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Row with Back Arrow + Tabs */}
      <div className="flex justify-between items-center px-4 border-b border-slate-200 bg-white">
        {/* Back Arrow */}
        <button
          className="text-blue-600 p-3 cursor-not-allowed opacity-70"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Tabs */}
        <div className="text-sm font-medium text-center text-slate-500">
          <ul className="flex space-x-4">
            <li>
              <div className="h-8 w-24 bg-slate-200 animate-pulse rounded"></div>
            </li>
            <li>
              <div className="h-8 w-32 bg-slate-200 animate-pulse rounded"></div>
            </li>
          </ul>
        </div>

        {/* Spacer to balance layout */}
        <div className="w-[40px]"></div>
      </div>

      {/* Tab Content Skeleton */}
      <div className="w-[min(1100px,90%)] mx-auto mt-6">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 my-2">
          {/* Profile Card Skeleton */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 h-80">
            <div className="h-6 w-48 bg-slate-200 animate-pulse rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center">
                  <div className="h-5 w-24 bg-slate-200 animate-pulse rounded mr-4"></div>
                  <div className="h-5 w-48 bg-slate-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Skeleton */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 h-80">
            <div className="flex justify-between items-center mb-6">
              <div className="h-7 w-48 bg-slate-200 animate-pulse rounded"></div>
              <div className="h-10 w-32 bg-blue-200 animate-pulse rounded"></div>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {[1, 2, 3, 4, 6, 7, 8].map(i => (
                <div key={i} className="mb-4">
                  <div className="h-4 w-16 bg-slate-200 animate-pulse rounded mb-2"></div>
                  <div className="h-10 w-full bg-slate-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
