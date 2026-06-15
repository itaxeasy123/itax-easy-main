export default function RegisterStartupLoading() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-5 w-full max-w-xl bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        {/* Form skeleton */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-36 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-5 w-28 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-24 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="h-12 w-48 bg-blue-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
