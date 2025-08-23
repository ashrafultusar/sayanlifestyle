"use client";

import useCategories from "@/hook/useCategories";
import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function page() {
  const { categories, setCategories } = useCategories();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleAddCategory = async () => {
    if (!newCategory || !newImage) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("name", newCategory);
    formData.append("image", newImage);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setCategories((prev) => [data, ...prev]);
      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      setNewCategory("");
      setNewImage(null);
      setPreview(null);
      setShowForm(false);
      toast.success("Category uploaded successfully");
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error uploading:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete category");
        return;
      }

      toast.success("Category deleted");

      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 space-y-6 text-black max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> {showForm ? "Close" : "Add Category"}
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow space-y-3">
          {/* Category Name Input */}
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          {/* Image Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <p className="text-gray-500">Drag & Drop Images or</p>
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Browse Files
            </button>
          </div>

          {/* Preview Image */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded border mt-3"
            />
          )}

          {/* Submit Button */}
          <button
            onClick={handleAddCategory}
            disabled={loading}
            className={`px-4 py-2 cursor-pointer text-white rounded-lg transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Category Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-left ">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 ">Image</th>

              <th className="p-3 ">Category Name</th>
              <th className="p-3  text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((cat) =>
                cat.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((cat) => (
                <tr key={cat?._id} className="hover:bg-gray-50">
                  <td className="p-3 ">
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="p-3">{cat?.name}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="p-2 rounded-lg cursor-pointer border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
