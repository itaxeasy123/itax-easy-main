'use client';

const UserProfileSkeleton = () => {
  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 mb-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-48 bg-slate-200 animate-pulse rounded"></div>
        <div className="h-9 w-24 bg-slate-200 animate-pulse rounded"></div>
      </div>

      {/* Form fields skeleton */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="mb-3">
            <div className="h-4 w-20 bg-slate-200 animate-pulse rounded mb-2"></div>
            <div className="h-10 w-full bg-slate-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>

      {/* Buttons skeleton */}
      <div className="flex justify-end mt-6 space-x-3">
        <div className="h-10 w-24 bg-slate-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
