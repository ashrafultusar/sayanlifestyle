import React from "react";

const ImageUploader = ({ label, multiple = false, onChange }) => {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">{label}</h2>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={onChange}
        className="mb-2"
      />
    </div>
  );
};

export default ImageUploader;
