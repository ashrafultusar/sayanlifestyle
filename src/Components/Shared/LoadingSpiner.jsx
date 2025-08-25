import React from "react";

const LoadingSpinner = ({ size = 16, overlay = true }) => {
  return (
    <>
      {overlay ? (
        // Full screen overlay spinner
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
          <div
            className={`w-${size} h-${size} border-4 border-black border-t-transparent rounded-full animate-spin`}
          ></div>
        </div>
      ) : (
        // Inline spinner
        <div
          className={`w-${size} h-${size} border-4 border-black border-t-transparent rounded-full animate-spin`}
        ></div>
      )}
    </>
  );
};

export default LoadingSpinner;
