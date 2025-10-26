"use client";

import React, { useRef } from "react";
import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductSkeleton from "@/Components/Skeleton/ProductSkeleton";

const NewArrival = ({ products, loading = false, error = null }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (loading)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-5 mt-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!products || products.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">No products found.</p>
    );

  return (
    <div className="relative px-5 mt-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black uppercase">
        New Arrivals
      </h1>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 }, // mobile
            640: { slidesPerView: 3, spaceBetween: 16 }, // tablet
            1024: { slidesPerView: 5, spaceBetween: 20 }, // desktop
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                _id={product._id}
                title={product.title}
                image={product.image}
                price={product.price}
                isNew={product.isNew}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          ref={prevRef}
          className="absolute top-1/2 -translate-y-1/2 left-1 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md z-10 cursor-pointer"
        >
          ❮
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 -translate-y-1/2 right-1 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md z-10 cursor-pointer"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
