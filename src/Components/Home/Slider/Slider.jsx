"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Swiper */}
        <div className="lg:col-span-2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="w-full h-[250px] md:h-[400px] lg:h-[450px]  rounded-sm overflow-hidden"
          >
            <SwiperSlide>
              <img
                src="/slider-1.jpg"
                alt="Joggers"
                className="w-full  object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/slider-2.jpg"
                alt="Jersey"
                className="w-full  object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/slider-3.jpg"
                alt="Trousers"
                className="w-full  object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Side Images */}
        <div className="hidden lg:flex flex-col gap-4">
          <img
            src="/slider-1.jpg"
            alt="Half Sleeve Collection"
            className="w-full md:h-[400px] lg:h-[210px] object-cover rounded-sm"
          />
          <img
            src="/slider-2.jpg"
            alt="Full Sleeve Jersey"
            className="w-full md:h-[400px] lg:h-[220px] object-cover rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
