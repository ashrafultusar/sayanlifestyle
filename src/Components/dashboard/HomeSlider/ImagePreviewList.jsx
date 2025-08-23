import React from "react";

const ImagePreviewList = ({ files = [], removable = false, onClear }) => {
  return (
    <div className="mb-4">
      {removable && files.length > 0 && (
        <button
          onClick={onClear}
          className="text-sm text-red-600 underline mb-2"
        >
          Remove All Images
        </button>
      )}
      <div className="flex gap-2 flex-wrap">
        {files.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewList;
