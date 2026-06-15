export default function DownloadsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-5 w-full max-w-2xl bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        {/* Filter options skeleton */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="h-10 w-32 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="h-10 w-36 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        {/* Downloads list skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Download name and description */}
              <div className="space-y-2 flex-grow">
                <div className="h-7 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded-md animate-pulse w-full md:w-2/3"></div>
              </div>
              
              {/* Download button */}
              <div className="h-10 bg-blue-100 rounded-md animate-pulse w-full md:w-32"></div>
            </div>
          ))}
        </div>
        
        {/* Pagination skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="h-10 w-10 bg-blue-100 rounded-md animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
