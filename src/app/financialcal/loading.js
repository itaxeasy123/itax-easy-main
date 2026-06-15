export default function CalculatorLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="flex flex-col space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-8 w-24 bg-blue-100 rounded-md animate-pulse"></div>
          </div>
          
          {/* Calculator form skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-full bg-gray-100 rounded-md animate-pulse"></div>
              
              <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-full bg-gray-100 rounded-md animate-pulse"></div>
              
              <div className="h-6 w-36 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-full bg-gray-100 rounded-md animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-6 w-44 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-full bg-gray-100 rounded-md animate-pulse"></div>
              
              <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-full bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          </div>
          
          {/* Button skeleton */}
          <div className="flex justify-center">
            <div className="h-12 w-40 bg-blue-200 rounded-md animate-pulse"></div>
          </div>
          
          {/* Results skeleton */}
          <div className="mt-6 border-t pt-6">
            <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-24 w-full bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-24 w-full bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
