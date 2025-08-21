'use client';

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function CategoriesManagement() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Men's Clothing" },
    { id: 2, name: "Women's Clothing" },
    { id: 3, name: "Accessories" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Add new category handler
  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;
    const newCat = { id: categories.length + 1, name: newCategory };
    setCategories([...categories, newCat]);
    setNewCategory("");
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6 text-black max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> {showForm ? "Close" : "Add Category"}
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow space-y-3">
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Category Name</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((cat) =>
                cat.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{cat.id}</td>
                  <td className="p-3 border-b">{cat.name}</td>
                  <td className="p-3 border-b text-right space-x-2">
                    <button className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50">
                      <FaEdit />
                    </button>
                    <button className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
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
