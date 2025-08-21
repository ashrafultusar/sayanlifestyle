"use client";

import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import useProducts from "@/hook/useProducts";
import React, { useState } from "react";

const Page = () => {
  const { products, loading, error } = useProducts();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen px-4 p-4 text-black">
      {/* Filters toggle on mobile */}
      <div className="md:hidden mb-4">
        <button
          className="flex items-center gap-2 text-lg font-medium"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters {showFilters ? "▲" : "▼"}
        </button>
        {showFilters && (
          <div className="mt-4 border border-gray-300 rounded p-4">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Men
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Women
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Kids
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Type</h3>
              <div className="space-y-2">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Topwear
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Bottomwear
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Winterwear
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Sidebar Filters (Hidden on mobile, visible on md+) */}
        <aside className="hidden md:block md:w-60 border border-gray-200 rounded p-4 flex-shrink-0 h-fit">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <label className="block">
                <input type="checkbox" className="mr-2" /> Men
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Women
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Kids
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Type</h3>
            <div className="space-y-2">
              <label className="block">
                <input type="checkbox" className="mr-2" /> Topwear
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Bottomwear
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Winterwear
              </label>
            </div>
          </div>
        </aside>

        {/* Scrollable Product Grid */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 sticky top-0 bg-white z-10 py-3">
            <h1 className="text-2xl font-semibold">All Collection</h1>
            <select className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto">
              <option>Sort by: Relevant</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 pb-20">
            {products.map((product) => (
              <ProductCard
                key={product?._id}
                id={product?._id}
                title={product?.title}
                image={product?.image}
                description={product?.description}
                discountPrice={product?.discountPrice}
                price={product?.price}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
