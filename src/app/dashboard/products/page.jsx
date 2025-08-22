"use client";
import useCategories from "@/hook/useCategories";
import useProducts from "@/hook/useProducts";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash
} from "react-icons/fa";

const Page = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortField, setSortField] = useState("title"); // 'title' or 'price'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  useEffect(() => {
    let results = products;

    // Search filter (title + category match)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term)
      );
    }

    // Category filter (dropdown)
    if (selectedCategory) {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sorting
    results = [...results].sort((a, b) => {
      if (sortField === "title") {
        const aVal = a.title.toLowerCase();
        const bVal = b.title.toLowerCase();
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else if (sortField === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, sortField, sortOrder, products]);

  const handleEdit = () => {
    console.log("Edit product", productId);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product", productId);
    }
  };

  return (
    <div className="container mx-auto text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products: {products?.length}</h1>
        <Link href="/dashboard/createProduct">
          <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Create Product
          </button>
        </Link>
      </div>
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or category..."
          className="text-md bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((ctg) => (
            <option key={ctg._id} value={ctg.name}>
              {ctg.name}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full table-auto border-collapse mt-4 bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-4">
                {product.image?.length > 0 ? (
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </td>
              <td className="p-4">{product?.title}</td>
              <td className="p-4">{product?.Category}</td>
              <td className="p-4">${product?.price}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEdit(product?._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product?._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
