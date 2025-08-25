"use client";

import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import { useData } from "@/context/DataContext";


import Link from "next/link";
import React from "react";

const BestSellingProducts = () => {
  
  const { products } = useData();
 
 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-black underline">
        Best Selling
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
      <Link href={'/collection'}>
        
      <button className="bg-black hover:bg-gray-800 text-white rounded px-4 py-1  cursor-pointer">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BestSellingProducts;
