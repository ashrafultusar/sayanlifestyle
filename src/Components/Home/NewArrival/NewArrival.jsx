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

const NewArrival = () => {
  const { products, loading, error } = useData();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-6  text-black underline">
        New Arrivals
      </h1>

      <div className="px-4 group">
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
              <div className="transition-transform duration-300 hover:scale-105">
                <ProductCard
                  _id={product._id}
                  title={product?.title}
                  image={product?.image}
                  description={product?.description}
                  discountPrice={product?.discountPrice}
                  price={product?.price}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🔹 Custom Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1 z-10 opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="custom-prev bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md">
            ❮
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-1 z-10 opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="custom-next bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md">
            ❯
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default NewArrival;
