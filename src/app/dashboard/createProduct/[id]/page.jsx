"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useCategories from "@/hook/useCategories";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { categories } = useCategories();

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
  const [existingImages, setExistingImages] = useState([]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setForm({
          title: data.title || "",
          size: data.size || "",
          Chest: data.Chest || "",
          Length: data.Length || "",
          Category: data.Category || "",
          Code: data.Code || "",
          price: data.price || "",
          discountPrice: data.discountPrice || "",
          description: data.description || "",
        });
        setExistingImages(data.image || []);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (indexToRemove, isExisting = false) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
    } else {
      setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
      setImagePreviews(imagePreviews.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    // Attach newly uploaded files
    imageFiles.forEach((file) => formData.append("images", file));

    // Attach existing images (you can optionally manage them differently)
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update product");

      toast.success("Product updated!");
      router.push("/dashboard/products");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl text-black mx-auto mt-4 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full h-32"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="size"
                value={form.size}
                placeholder="Size"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <select
                name="Category"
                value={form.Category}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="Chest"
                value={form.Chest}
                placeholder="Chest"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="number"
                name="Length"
                value={form.Length}
                placeholder="Length"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                name="Code"
                value={form.Code}
                placeholder="Code"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={form.price}
                placeholder="Price"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                placeholder="Discount Price"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
          <div className="border-2 border-dashed mb-2 border-gray-300 rounded-lg p-6 text-center h-40 flex items-center justify-center flex-col">
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
            

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4 grid grid-cols-3 gap-2">
                {existingImages.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Existing ${index}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
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
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100"
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
            className="bg-green-600 text-white p-4 rounded-lg mt-auto text-xl font-semibold hover:bg-green-700 transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
