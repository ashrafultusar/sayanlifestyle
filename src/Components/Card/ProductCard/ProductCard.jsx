"use client";

import Link from "next/link";
import React from "react";

const ProductCard = ({ _id, title, image, price, isNew }) => {
  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
      {/* Image Section */}
      <Link href={`/productDetails/${_id}`}>
        <div className="relative">
          {/* "NEW" Badge */}
          {isNew && (
            <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
              NEW
            </span>
          )}
          <img
            src={imageUrl || "https://via.placeholder.com/400x500"}
            alt={title}
            className="w-full h-[500px] object-cover"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="text-center py-4">
        <h2 className="text-lg font-medium text-gray-800 uppercase tracking-wide">
          {title}
        </h2>
        <p className="text-gray-900 text-base font-semibold mt-1">
          Tk. {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
