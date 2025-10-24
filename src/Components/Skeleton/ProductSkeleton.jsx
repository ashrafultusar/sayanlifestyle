"use client";

import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image Skeleton */}
      <div className="bg-gray-300 h-48 w-full"></div>

      {/* Text Skeleton */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
