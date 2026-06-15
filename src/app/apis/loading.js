export default function APIsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-5 w-full max-w-2xl bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        {/* Search bar skeleton */}
        <div className="mb-8">
          <div className="h-12 w-full max-w-lg bg-gray-100 rounded-md animate-pulse mx-auto"></div>
        </div>
        
        {/* API Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              {/* API title */}
              <div className="h-7 bg-gray-200 rounded-md animate-pulse w-3/4 mb-4"></div>
              
              {/* API description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-100 rounded-md animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded-md animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded-md animate-pulse w-2/3"></div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="h-6 w-16 bg-blue-100 rounded-full animate-pulse"></div>
                <div className="h-6 w-20 bg-green-100 rounded-full animate-pulse"></div>
                <div className="h-6 w-14 bg-yellow-100 rounded-full animate-pulse"></div>
              </div>
              
              {/* Button */}
              <div className="h-10 bg-blue-100 rounded-md animate-pulse w-full mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
