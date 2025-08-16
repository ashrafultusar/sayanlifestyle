"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSection() {
  return (
    <div className="container mx-auto py-4">
    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[350px] lg:h-[200px]">

        <div className="lg:col-span-2 relative h-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src="/slider-1.jpg"
                  alt="Joggers"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src="/slider-2.jpg"
                  alt="Jersey"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src="/slider-3.jpg"
                  alt="Trousers"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

       
        <div className="hidden lg:flex flex-col gap-4 h-full">
        
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <img
              src="/slider-1.jpg"
              alt="Half Sleeve Collection"
              className="w-full h-full object-cover"
            />
          </div>

        
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <img
              src="/slider-2.jpg"
              alt="Full Sleeve Jersey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}