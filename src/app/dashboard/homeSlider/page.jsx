// app/(your-page)/page.jsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [rightImageTop, setRightImageTop] = useState(null);
  const [rightImageBottom, setRightImageBottom] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSliderChange = (e) => {
    const files = Array.from(e.target.files);
    setSliderImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    if (!sliderImages.length || !rightImageTop || !rightImageBottom) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    sliderImages.forEach((file) => formData.append("sliderImages", file));
    formData.append("rightImageTop", rightImageTop);
    formData.append("rightImageBottom", rightImageBottom);

    try {
      setLoading(true);
      const res = await axios.post("/api/homeslider", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Uploaded successfully!");
        setSliderImages([]);
        setRightImageTop(null);
        setRightImageBottom(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Home Image Upload</h1>

      {/* LEFT SIDE - SLIDER IMAGES */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Left Slider Images (Multiple)</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleSliderChange}
          className="mb-4"
        />

        {sliderImages.length > 0 && (
          <button
            onClick={() => setSliderImages([])}
            className="text-sm text-red-600 underline mb-2"
          >
            Remove All Images
          </button>
        )}

        <div className="flex gap-2 flex-wrap">
          {sliderImages.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - TOP */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Right Image Top (Single)</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setRightImageTop(e.target.files[0])}
          className="mb-4"
        />
        {rightImageTop && (
          <img
            src={URL.createObjectURL(rightImageTop)}
            alt="preview"
            className="w-24 h-24 object-cover rounded"
          />
        )}
      </div>

      {/* RIGHT SIDE - BOTTOM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Right Image Bottom (Single)</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setRightImageBottom(e.target.files[0])}
          className="mb-4"
        />
        {rightImageBottom && (
          <img
            src={URL.createObjectURL(rightImageBottom)}
            alt="preview"
            className="w-24 h-24 object-cover rounded"
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
};

export default Page;
