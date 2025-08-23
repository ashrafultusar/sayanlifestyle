"use client";

import Link from "next/link";
import React from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaShoppingCart,
} from "react-icons/fa";

const ProductCard = ({ _id, title, image, discountPrice, price }) => {
  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <div className="w-full text-black bg-white rounded-xl border border-gray-200 overflow-hidden shadow transition-shadow duration-300 group hover:shadow-xl flex flex-col">
      {/* Image */}
      <Link href={`/productDetails/${_id}`}>
        <div className="overflow-hidden">
          <img
            src={imageUrl || "https://via.placeholder.com/300x200"}
            alt={title}
            className="w-full h-40 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Title and Rating */}
        <div>
          <div className=" mb-2">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>

          <div>
            <p className="text-lg font-bold">
              ${discountPrice}{" "}
              <span className="line-through text-sm text-gray-400">
                ${price}
              </span>
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <Link href={`/productDetails/${_id}`}>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded flex items-center cursor-pointer justify-center w-full gap-2 transition-all duration-300 group/button relative overflow-hidden">
            <span className="transition-opacity duration-300 group-hover/button:opacity-0">
              Buy Now
            </span>
            <FaShoppingCart className="absolute opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
