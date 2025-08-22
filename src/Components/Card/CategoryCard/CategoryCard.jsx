"use client";
import React from "react";

const CategoryCard = ({ icon, name, count }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200 p-4 w-full flex items-center gap-4">
      {/* Icon Section */}
      <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-lg">
        <span className="text-2xl text-gray-700">{icon}</span>
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
