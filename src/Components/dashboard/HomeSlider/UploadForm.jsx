import React from "react";

const UploadForm = ({
  sliderImages,
  rightImageTop,
  rightImageBottom,
  handleSliderChange,
  setRightImageTop,
  setRightImageBottom,
  handleSubmit,
  loading,
  clearSliderImages,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Multiple Slider Images */}
        <div>
          <ImageUploader
            label="Left Slider Images (Multiple)"
            multiple
            onChange={handleSliderChange}
          />
          <ImagePreviewList
            files={sliderImages}
            removable
            onClear={clearSliderImages}
          />
        </div>

        {/* Right Column: Two stacked uploads */}
        <div className="grid grid-rows-2 gap-4">
          <div>
            <ImageUploader
              label="Right Image Top (Single)"
              onChange={(e) => setRightImageTop(e.target.files[0])}
            />
            {rightImageTop && (
              <img
                src={URL.createObjectURL(rightImageTop)}
                alt="right top"
                className="w-24 h-24 object-cover rounded"
              />
            )}
          </div>

          <div>
            <ImageUploader
              label="Right Image Bottom (Single)"
              onChange={(e) => setRightImageBottom(e.target.files[0])}
            />
            {rightImageBottom && (
              <img
                src={URL.createObjectURL(rightImageBottom)}
                alt="right bottom"
                className="w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

/* ImageUploader Component  */
const ImageUploader = ({ label, multiple = false, onChange }) => {
  return (
    <div className="mb-6">
      {label && <h2 className="font-semibold mb-2">{label}</h2>}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500">Drag & Drop Images or</p>
          <div className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Browse Files
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

/* ImagePreviewList Component  */
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

export default UploadForm;
