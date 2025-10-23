import React from 'react';

const LoadingSpiner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
    <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden relative">
      <div className="absolute top-0 left-0 h-full bg-orange-500 animate-loading-line"></div>
    </div>
  </div>
  );
};

export default LoadingSpiner;