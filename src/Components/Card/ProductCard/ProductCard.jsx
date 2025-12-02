"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProductCard = ({ _id, title, image, price, regularPrice, discountPrice, isNew }) => {
  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <div className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 rounded-md">
      {/* Image Section */}
      <Link href={`/productDetails/${_id}`}>
        <div className="relative">
          {/* "NEW" Badge */}
          {isNew && (
            <span className="absolute top-2 left-2 bg-black text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded">
              NEW
            </span>
          )}

          {/* Image with next/image for optimization */}
          <Image
            src={imageUrl || "https://via.placeholder.com/400x500"}  // Placeholder if imageUrl is missing
            alt={title}
            width={500} // Set the width
            height={500} // Set the height (you can adjust the aspect ratio if necessary)
            className="w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            layout="intrinsic" // Ensure that it keeps the aspect ratio
            priority // Optionally add priority for the first images to load faster
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="text-center py-2 h-1/4 flex flex-col justify-center px-2">
        <h2
          className="text-sm sm:text-base md:text-lg font-medium text-gray-800 uppercase tracking-wide
          overflow-hidden line-clamp-2 break-words"
        >
          {title}
        </h2>

        {/* Price Section */}
        <div className="mt-1">
          {discountPrice > 0 ? (
            <div>
              <span className="text-gray-500 line-through">{regularPrice}</span>
              <span className="text-gray-900 font-semibold ml-2">Tk. {discountPrice}</span>
            </div>
          ) : (
            <span className="text-gray-900 text-sm sm:text-base md:text-lg font-semibold mt-1">
              Tk. {regularPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
