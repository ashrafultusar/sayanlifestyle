import React from "react";

const LoadingSpinner = ({ size = 48, overlay = true }) => {
  const spinner = (
    <div
      className="animate-spin rounded-full border-t-2 border-b-2 border-black"
      style={{ width: size, height: size }}
    ></div>
  );

  return overlay ? (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-200">
      {spinner}
    </div>
  ) : (
    <div className="flex justify-center items-center">{spinner}</div>
  );
};

export default LoadingSpinner;
