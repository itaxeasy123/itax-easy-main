export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-12 w-64 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-6 w-full max-w-2xl bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        {/* Blog grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Image placeholder */}
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              
              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
                
                {/* Date */}
                <div className="h-4 bg-gray-100 rounded-md animate-pulse w-1/3"></div>
                
                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded-md animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded-md animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded-md animate-pulse w-2/3"></div>
                </div>
                
                {/* Read more button */}
                <div className="h-8 bg-blue-100 rounded-md animate-pulse w-32 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
