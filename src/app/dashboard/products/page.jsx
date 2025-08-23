'use client';
import Pagination from "@/Components/Shared/Pagination";
import useCategories from "@/hook/useCategories";
import useProducts from "@/hook/useProducts";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";


const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { products, totalCount, loading } = useProducts(currentPage, itemsPerPage);
  const { categories } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);

  const handleDelete = async (productId) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Failed: ${errorData.error}`);
        return;
      }

      toast.success("Deleted!");
      setFilteredProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error occurred!");
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="container mx-auto text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/dashboard/createProduct">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Create Product
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or category..."
          className="bg-gray-200 px-3 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="bg-gray-200 px-3 py-2 rounded"
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

      {/* Table */}
      <table className="w-full table-auto bg-white shadow rounded-lg mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Size</th>
            <th className="p-4 text-left">Code</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="p-4">
                {product.image?.[0] ? (
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </td>
              <td className="p-4">{product.title}</td>
              <td className="p-4">{product.Category}</td>
              <td className="p-4">{product.size}</td>
              <td className="p-4">{product.Code}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4 flex gap-2">
                <Link href={`/dashboard/createProduct/${product._id}`}>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
/>
    </div>
  );
};

export default Page;
