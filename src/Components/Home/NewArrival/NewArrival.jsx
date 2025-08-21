"use client";

import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import useProducts from "@/hook/useProducts";
import Link from "next/link";
import React from "react";

const NewArrival = () => {
  const { products, loading, error } = useProducts();

  console.log(products);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-black underline">
        New Arrivals
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product?._id}
            _id={product._id}
            title={product?.title}
            image={product?.image}
            description={product?.description}
            discountPrice={product?.discountPrice}
            price={product?.price}
          />
        ))}
      </div>
      <div className="text-center py-4">
        <Link href={"/collection"}>
          <button className="text-black text-center cursor-pointer bg-slate-500 rounded-md px-2 py-1  ">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewArrival;
