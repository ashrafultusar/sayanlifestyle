"use client";

import React, { useState } from "react";

const UploadForm = ({
  sliders,
  updateLeftPartial,
  updateRightTop,
  updateRightBottom,
}) => {
  const [partialFile, setPartialFile] = useState(null);
  const [partialIndex, setPartialIndex] = useState("");

  const [rightTop, setRightTop] = useState(null);
  const [rightBottom, setRightBottom] = useState(null);

  const handleUpdatePartial = async () => {
    if (!partialFile || partialIndex === "") return;
    await updateLeftPartial(Number(partialIndex), partialFile);
    setPartialFile(null);
    setPartialIndex("");
  };

  const handleUpdateRightTop = async () => {
    if (!rightTop) return;
    await updateRightTop(rightTop);
    setRightTop(null);
  };

  const handleUpdateRightBottom = async () => {
    if (!rightBottom) return;
    await updateRightBottom(rightBottom);
    setRightBottom(null);
  };

  // Common styles for inputs and cards to ensure consistency
  const cardStyle = "bg-white p-6 rounded-xl shadow-[0_4px_12px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col";
  const headingStyle = "text-lg font-bold text-gray-800 mb-5";
  const inputBaseStyle = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-700 text-sm";
  
  // Modern styling for the file input element
  const fileInputStyle = `block w-full text-sm text-slate-500
    file:mr-4 file:py-2.5 file:px-4
    file:rounded-lg file:border-0
    file:text-sm file:font-semibold
    file:bg-indigo-50 file:text-indigo-700
    hover:file:bg-indigo-100
    border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none transition duration-200 py-1.5 pl-2`;

  return (
    // Added a light gray background to the main container so the white cards pop out
    <div className="bg-gray-50 p-8 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
        {/* LEFT PARTIAL */}
        <div className={cardStyle}>
          <h2 className={headingStyle}>Update Single Left Slider</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Slider Index</label>
            <input
              type="number"
              className={inputBaseStyle}
              placeholder="Enter index (e.g., 0, 1, 2...)"
              value={partialIndex}
              onChange={(e) => setPartialIndex(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setPartialFile(e.target.files[0])}
              className={fileInputStyle}
            />
          </div>

          {partialFile && (
            <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
               <p className="text-xs text-gray-500 mb-2 text-center font-medium">Selected Preview</p>
              <img
                src={URL.createObjectURL(partialFile)}
                alt="preview"
                className="w-full h-32 object-cover rounded-md mx-auto"
              />
            </div>
          )}
          
          <button
            onClick={handleUpdatePartial}
            // Used a richer yellow/amber and added width full and hover effects
            className="w-full mt-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Update Single Slide
          </button>
        </div>

        {/* RIGHT TOP */}
        <div className={cardStyle}>
          <h2 className={headingStyle}>Update Right TOP</h2>
          
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setRightTop(e.target.files[0])}
              className={fileInputStyle}
            />
          </div>

          {rightTop && (
             <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 mb-2 text-center font-medium">Selected Preview</p>
              <img
                src={URL.createObjectURL(rightTop)}
                alt="preview"
                // Standardized height for previews
                 className="w-full h-40 object-cover rounded-md mx-auto"
              />
            </div>
          )}
          
          <button
            onClick={handleUpdateRightTop}
            // Used a modern indigo/purple, full width and hover effects
            className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Update Right Top
          </button>
        </div>

        {/* RIGHT BOTTOM */}
        <div className={cardStyle}>
          <h2 className={headingStyle}>Update Right BOTTOM</h2>
          
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setRightBottom(e.target.files[0])}
              className={fileInputStyle}
            />
          </div>
          
          {rightBottom && (
             <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
               <p className="text-xs text-gray-500 mb-2 text-center font-medium">Selected Preview</p>
              <img
                src={URL.createObjectURL(rightBottom)}
                alt="preview"
                 className="w-full h-40 object-cover rounded-md mx-auto"
              />
            </div>
          )}
          
          <button
            onClick={handleUpdateRightBottom}
            className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Update Right Bottom
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;