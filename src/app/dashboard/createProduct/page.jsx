"use client";

import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { categories } = useData();
  const router=useRouter()
  const [form, setForm] = useState({
    title: "",
    size: "",
    Chest: "",
    Length: "",
    Category: "",
    Code: "",
    price: "",
    discountPrice: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]); // multiple append
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (indexToRemove) => {
    setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
    setImagePreviews(
      imagePreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload product");

      toast.success("Product uploaded!");
      setForm({
        title: "",
        size: "",
        Chest: "",
        Length: "",
        Category: "",
        Code: "",
        price: "",
        discountPrice: "",
        description: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      router.push('/dashboard/products')
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl text-black mx-auto mt-4 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        {/* Left Column for Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={form.title}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="size"
                placeholder="Size (e.g., S, M, L)"
                value={form.size}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                name="Category"
                value={form.Category}
                onChange={handleChange}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2"
              >
                <option value="">Category</option>
                {categories?.map((ctg) => (
                  <option key={ctg._id} value={ctg.name}>
                    {ctg.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="Chest"
                placeholder="Chest (cm)"
                value={form.Chest}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="Length"
                placeholder="Length (cm)"
                value={form.Length}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="Code"
                placeholder="Product Code"
                value={form.Code}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="discountPrice"
                placeholder="Discount Price"
                value={form.discountPrice}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column for Image Upload */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
            <h2 className="text-xl font-semibold mb-4">Image Uploads</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-40 flex items-center justify-center flex-col">
              <p className="text-gray-500 mb-2">Drag & Drop Images or</p>
              <label
                htmlFor="image-upload"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition"
              >
                Browse Files
              </label>
              <input
                id="image-upload"
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white p-4 rounded-lg mt-auto text-xl font-semibold cursor-pointer hover:bg-green-700 transition"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
