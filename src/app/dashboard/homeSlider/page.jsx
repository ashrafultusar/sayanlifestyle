"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UploadForm from "@/Components/dashboard/HomeSlider/UploadForm";
import SliderCard from "@/Components/dashboard/HomeSlider/SliderCard";

const Page = () => {
  const [sliders, setSliders] = useState(null);

  // Fetch slider data
  const fetchSliders = async () => {
    try {
      const res = await axios.get("/api/homeslider");
      setSliders(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Delete single left image
  const deleteLeftImage = async (index) => {
    try {
      const fd = new FormData();
      fd.append("action", "delete-left-image");
      fd.append("index", index);

      const res = await axios.post("/api/homeslider", fd);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchSliders(); // instant UI refresh
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  // Update handlers
  const updateLeftPartial = async (index, file) => {
    const fd = new FormData();
    fd.append("action", "update-left-partial");
    fd.append("index", index);
    fd.append("file", file);

    const res = await axios.post("/api/homeslider", fd);
    if (res.data.success) {
      toast.success(res.data.message);
      fetchSliders();
    }
  };

  const updateRightTop = async (file) => {
    const fd = new FormData();
    fd.append("action", "update-right-top");
    fd.append("rightImageTop", file);

    const res = await axios.post("/api/homeslider", fd);
    if (res.data.success) {
      toast.success(res.data.message);
      fetchSliders();
    }
  };

  const updateRightBottom = async (file) => {
    const fd = new FormData();
    fd.append("action", "update-right-bottom");
    fd.append("rightImageBottom", file);

    const res = await axios.post("/api/homeslider", fd);
    if (res.data.success) {
      toast.success(res.data.message);
      fetchSliders();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Home Slider Manager</h1>

      <UploadForm
        sliders={sliders}
        updateLeftPartial={updateLeftPartial}
        updateRightTop={updateRightTop}
        updateRightBottom={updateRightBottom}
      />

      <div className="mt-10">
        <SliderCard sliders={sliders} deleteLeftImage={deleteLeftImage} />
      </div>
    </div>
  );
};

export default Page;
