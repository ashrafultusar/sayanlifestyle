"use client";

import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import useProducts from "@/hook/useProducts";
import React from "react";



const BestSellingProducts = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div >
      <h1 className="text-2xl font-bold mb-6 text-center text-black underline">New Arrivals</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
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
    </div>
  );
};

export default BestSellingProducts;
