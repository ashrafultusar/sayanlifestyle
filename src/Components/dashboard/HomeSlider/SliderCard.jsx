import React from "react";

const SliderCard = ({ item, onDelete }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
      <h3 className="font-semibold text-lg">Slider Images</h3>
      <div className="flex flex-wrap gap-2">
        {item.sliderImages.map((url, i) => (
          <img
            key={i}
            src={url}
            alt="slider"
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>

      <div>
        <h4 className="font-semibold mt-2">Right Image Top</h4>
        <img
          src={item.rightImageTop}
          alt="right top"
          className="w-full h-32 object-cover rounded"
        />
      </div>

      <div>
        <h4 className="font-semibold mt-2">Right Image Bottom</h4>
        <img
          src={item.rightImageBottom}
          alt="right bottom"
          className="w-full h-32 object-cover rounded"
        />
      </div>

      <button
        onClick={() => onDelete(item._id)}
        className="mt-3 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default SliderCard;
