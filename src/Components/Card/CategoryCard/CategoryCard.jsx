"use client";
import React from "react";

const CategoryCard = ({ imageUrl, name, count }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200 p-4 w-full flex items-center gap-4">
      {/* Image Section */}
      <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        )}
      </div>

      {/* Text Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-500">
          {count > 0 ? `${count} products` : "No products"}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
