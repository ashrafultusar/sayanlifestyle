"use client";

import React from "react";

const SliderCard = ({ sliders, deleteLeftImage }) => {
  if (!sliders) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT SLIDERS */}
      <div className="border bg-white p-4 rounded">
        <h2 className="font-semibold text-black mb-3">Left Slider Images</h2>
        <div className="flex flex-wrap gap-3">
          {sliders?.sliderImages?.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                className="w-24 h-24 object-cover rounded border"
              />
              <span className="absolute bottom-0 left-0 text-white bg-black px-1 text-xs">
                {i}
              </span>
              <button
                onClick={() => deleteLeftImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT TOP */}
      <div className="border bg-white p-4 rounded">
        <h2 className="font-semibold text-black mb-3">Right Top</h2>
        {sliders?.rightImageTop && (
          <img
            src={sliders.rightImageTop}
            className="w-full h-40 object-cover rounded"
          />
        )}
      </div>

      {/* RIGHT BOTTOM */}
      <div className="border  bg-white p-4 rounded">
        <h2 className="font-semibold text-black mb-3">Right Bottom</h2>
        {sliders?.rightImageBottom && (
          <img
            src={sliders.rightImageBottom}
            className="w-full h-40 object-cover rounded"
          />
        )}
      </div>
    </div>
  );
};

export default SliderCard;
