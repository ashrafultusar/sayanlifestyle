"use client";

import CategoryCard from "@/Components/Card/CategoryCard/CategoryCard";
import { FaShirt } from "react-icons/fa6";
import { GiTrousers } from "react-icons/gi";
import { MdChildCare } from "react-icons/md";
import { PiShirtFoldedLight } from "react-icons/pi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./categories-swiper.css"; // Custom Swiper button styles

const categories = [
  { icon: <PiShirtFoldedLight />, name: "T-Shirts", count: 10 },
  { icon: <MdChildCare />, name: "Pants", count: 8 },
  { icon: <GiTrousers />, name: "Shoes", count: 15 },
  { icon: <FaShirt />, name: "Shoes", count: 15 },
  { icon: <PiShirtFoldedLight />, name: "T-Shirts", count: 10 },
  { icon: <MdChildCare />, name: "Pants", count: 8 },
  { icon: <GiTrousers />, name: "Shoes", count: 15 },
  { icon: <FaShirt />, name: "Shoes", count: 15 },
];

export default function CategoriesSection() {
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
            <CategoryCard icon={cat.icon} name={cat.name} count={cat.count} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
