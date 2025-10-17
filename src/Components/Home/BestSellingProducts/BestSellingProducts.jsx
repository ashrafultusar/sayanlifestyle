"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import { useData } from "@/context/DataContext";

// 🌀 Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// 🌀 Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

const BestSellingProducts = () => {
  const { products, loading, error } = useData();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="relative">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black ml-5 uppercase">
      Best Selling 
      </h1>

      <div >
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product?._id}>
              {/* ❌ Removed hover scale and transition */}
              <ProductCard
                _id={product._id}
                title={product?.title}
                image={product?.image}
                price={product?.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🔹 Custom Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1 z-10">
          <button className="custom-prev bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md cursor-pointer">
            ❮
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-1 z-10">
          <button className="custom-next bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md cursor-pointer">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
