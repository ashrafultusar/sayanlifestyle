"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const mockProducts = [
  { title: "T-Shirt", category: "Clothing", price: 20, code: "TS001" },
  { title: "Hoodie", category: "Winter", price: 40, code: "HD002" },
  // Add more mock data or fetch from an API
];

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    const results = mockProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm]);

  return (
    <div className="container mx-auto text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/dashboard/createProduct">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Create Product
          </button>
        </Link>
      </div>

      <div className="mb-4 flex justify-end items-center gap-4">
  <input
    type="text"
    placeholder="Search products..."
    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <select
    name="Category"
    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Category</option>
    <option value="Clothing">Clothing</option>
    <option value="Footwear">Footwear</option>
    <option value="Accessories">Accessories</option>
    <option value="Winterwear">Winterwear</option>
  </select>
</div>


      <table className="w-full table-auto border-collapse mt-4 bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-4">{product.title}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4">{product.code}</td>
            </tr>
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;
