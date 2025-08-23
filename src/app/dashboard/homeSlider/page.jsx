"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UploadForm from "@/Components/dashboard/HomeSlider/UploadForm";
import SliderCard from "@/Components/dashboard/HomeSlider/SliderCard";


const Page = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [rightImageTop, setRightImageTop] = useState(null);
  const [rightImageBottom, setRightImageBottom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allSliders, setAllSliders] = useState([]);

  const fetchSliders = async () => {
    try {
      const res = await axios.get("/api/homeslider");
      setAllSliders(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleSliderChange = (e) => {
    const files = Array.from(e.target.files);
    setSliderImages((prev) => [...prev, ...files]);
  };

  const clearSliderImages = () => setSliderImages([]);

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
        fetchSliders();
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/homeslider?id=${id}`);
      if (res.data.success) {
        toast.success("Deleted successfully!");
        fetchSliders();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Home Image Upload</h1>

      <UploadForm
        sliderImages={sliderImages}
        rightImageTop={rightImageTop}
        rightImageBottom={rightImageBottom}
        handleSliderChange={handleSliderChange}
        setRightImageTop={setRightImageTop}
        setRightImageBottom={setRightImageBottom}
        handleSubmit={handleSubmit}
        loading={loading}
        clearSliderImages={clearSliderImages}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSliders.map((item) => (
          <SliderCard key={item._id} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Page;
