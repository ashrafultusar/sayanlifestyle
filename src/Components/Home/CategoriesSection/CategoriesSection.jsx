"use client";

import CategoryCard from "@/Components/Card/CategoryCard/CategoryCard";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./categories-swiper.css";
import {  useData } from "@/context/DataContext";


export default function CategoriesSection() {

  const { categories } = useData();

  return (
    <div className="w-full  p-6 rounded-lg">
      <h1 className="text-black md:text-3xl text-center uppercase font-medium mb-4">
        Shop by Categories
      </h1>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        pagination={false}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <CategoryCard imageUrl={cat?.imageUrl} name={cat?.name} count={cat?.count} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
