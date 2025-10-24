"use client";

import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image Placeholder */}
      <div className="bg-gray-300 h-40 w-full"></div>

      {/* Text Placeholder */}
      <div className="p-3">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
