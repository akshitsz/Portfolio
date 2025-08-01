'use client';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-600"></div>
          
          {/* Inner ring */}
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-purple-600 animate-reverse-spin"></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Akshit Singh
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 animate-pulse">
            Loading portfolio...
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
