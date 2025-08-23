"use client";

import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import { CategoryFilter } from "@/Components/CategoryFilter/CategoryFilter";
import Pagination from "@/Components/Shared/Pagination";
import useCategories from "@/hook/useCategories";
import useProducts from "@/hook/useProducts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync with query params
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page")) || 1;

    setSelectedCategory(category);
    setSelectedSort(sort);
    setCurrentPage(page);
  }, [searchParams]);

  const search = searchParams.get("search") || "";
  const { products, totalCount, loading } = useProducts(
    currentPage,
    itemsPerPage,
    selectedCategory,
    selectedSort,
    search
  );
  

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const { categories } = useCategories();

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen px-4 py-4 text-black">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-60 border border-gray-200 rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 sticky top-0 bg-white z-10 py-3">
          <h1 className="text-2xl font-semibold capitalize">
  {search
    ? `Results for "${search}"`
    : selectedCategory || "All Collection"}
</h1>

            <select
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
              value={selectedSort}
              onChange={handleSortChange}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="lowToHigh">Price: High to Low</option>
              <option value="highToLow">Price: Low to High</option>
            </select>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 pb-20">
                {products?.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
