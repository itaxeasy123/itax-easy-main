'use client';
import { useState, lazy, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Loader from '@/components/partials/loading/Loader';

// Lazy load the profile components for better performance
const UserProfile = lazy(() => import('@/components/pagesComponents/profile/UserProfile'));
const BusinessProfile = lazy(() => import('@/components/pagesComponents/profile/BusinessProfile'));

export default function ProfileIndex() {
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleBack = () => {
    router.back();
  };

  // Prefetch the inactive tab after the active one has loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 1) {
        import('@/components/pagesComponents/profile/BusinessProfile');
      } else {
        import('@/components/pagesComponents/profile/UserProfile');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = [
    { id: 1, label: 'User Profile' },
    { id: 2, label: 'Business Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header: back + tabs */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:gap-0 sm:px-6">
          <div className="flex w-full items-center justify-start py-2 sm:w-auto sm:py-0">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              aria-label="Go Back"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>

          <div className="no-scrollbar w-full overflow-x-auto sm:w-auto">
            <ul className="flex justify-center gap-1 whitespace-nowrap sm:justify-start sm:gap-2">
              {tabs.map((t) => (
                <li key={t.id}>
                  <button
                    className={`border-b-2 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      activeTab === t.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                    onClick={() => handleTab(t.id)}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* spacer to balance the back button on desktop */}
          <div className="hidden w-[60px] sm:block" />
        </div>
      </div>

      {/* Tab content */}
      <main className="mx-auto mt-4 w-full max-w-5xl px-4 pb-12 sm:mt-8 sm:px-6">
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <Loader />
            </div>
          }
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            {activeTab === 1 && <UserProfile />}
            {activeTab === 2 && <BusinessProfile />}
          </div>
        </Suspense>
      </main>
    </div>
  );
}
