"use client";
import React from "react";

const CategoryCard = ({ imageUrl, name }) => {
  return (
    <div className="relative group overflow-hidden cursor-pointer w-full h-[300px] md:h-[400px] lg:h-[500px]">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-end pb-6 text-white">
        <h3 className="text-lg md:text-4xl lg:text-5xl font-semibold uppercase tracking-wide">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
