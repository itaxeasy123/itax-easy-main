export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-12 w-72 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-6 w-full max-w-2xl bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              {/* Image placeholder */}
              <div className="h-56 bg-gray-200 animate-pulse"></div>
              
              {/* Content */}
              <div className="p-6 space-y-3">
                {/* Title */}
                <div className="h-7 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
                
                {/* Price */}
                <div className="h-5 bg-gray-100 rounded-md animate-pulse w-1/3"></div>
                
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded-md animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded-md animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded-md animate-pulse w-2/3"></div>
                </div>
                
                {/* Button */}
                <div className="h-10 bg-blue-100 rounded-md animate-pulse w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
