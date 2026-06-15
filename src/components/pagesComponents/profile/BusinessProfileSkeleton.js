'use client';
const BusinessProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 my-2">
        {/* Profile Card Skeleton */}
        <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
          <div className="h-6 w-48 bg-slate-200 animate-pulse rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center">
                <div className="h-5 w-24 bg-slate-200 animate-pulse rounded mr-4"></div>
                <div className="h-5 w-48 bg-slate-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="h-7 w-48 bg-slate-200 animate-pulse rounded"></div>
            <div className="h-10 w-32 bg-blue-200 animate-pulse rounded"></div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="mb-4">
                <div className="h-4 w-16 bg-slate-200 animate-pulse rounded mb-2"></div>
                <div className="h-10 w-full bg-slate-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center py-4 gap-3">
            <div className="h-10 w-24 bg-slate-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileSkeleton;
