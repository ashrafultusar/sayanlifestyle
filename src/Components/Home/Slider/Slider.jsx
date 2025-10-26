"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ data }) {
  const sliderData = data?.data?.[0] || null;

  if (!sliderData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-pulse">
        <div className="lg:col-span-2">
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[555px] bg-gray-200 rounded-sm"></div>
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          <div className="w-full h-[270px] bg-gray-200 rounded-sm"></div>
          <div className="w-full h-[270px] bg-gray-200 rounded-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Main Swiper */}
      <div className="lg:col-span-2">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="w-full rounded-sm overflow-hidden"
        >
          {sliderData?.sliderImages?.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[230px] sm:h-[300px] md:h-[400px] lg:h-[555px]">
                <img
                  src={imgUrl}
                  alt={`Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover md:object-fill lg:object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Images */}
      <div className="hidden lg:flex flex-col gap-4">
        <img
          src={sliderData?.rightImageTop}
          alt="Half Sleeve Collection"
          className="w-full h-[270px] object-cover rounded-sm"
        />
        <img
          src={sliderData?.rightImageBottom}
          alt="Full Sleeve Jersey"
          className="w-full h-[270px] object-cover rounded-sm"
        />
      </div>
    </div>
  );
}
