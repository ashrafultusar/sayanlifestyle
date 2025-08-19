import React from "react";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const ProductCard = ({ title, image, description, discountPrice, price }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Image */}
      <img
        src={image || "https://via.placeholder.com/300x200"}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{description?.slice(0, 30)}...</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar />
            <span>4.6/5</span>
          </div>
        </div>

        {/* Info section */}
        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span>Joined Apr 21, 2006</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>London</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-400" />
            <span>Sun - Fri · 9:30 AM - 11 PM</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Start from</p>
            <p className="text-lg font-bold">${discountPrice}{" "}
              <span className="line-through text-sm text-gray-400">${price}</span>
            </p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded">
            Booking Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
