"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ data }) {
  const sliderData = data?.data || null;

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
      {/* Main Slider */}
      <div className="lg:col-span-2">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="w-full rounded-sm overflow-hidden"
        >
          {sliderData.sliderImages?.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[230px] sm:h-[300px] md:h-[400px] lg:h-[555px]">
                <Image
                  src={`${imgUrl}?f_auto,q_auto`} // Cloudinary optimize
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0} // First slide preload
                  placeholder="blur"
                  blurDataURL={`${imgUrl}?w=10&q=10`} // tiny blur placeholder
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Images */}
      <div className="hidden lg:flex flex-col gap-4">
        <div className="relative w-full h-[270px]">
          <Image
            src={`${sliderData.rightImageTop}?f_auto,q_auto`}
            alt="Right Top"
            fill
            className="object-cover rounded-sm"
            placeholder="blur"
            blurDataURL={`${sliderData.rightImageTop}?w=10&q=10`}
          />
        </div>
        <div className="relative w-full h-[270px]">
          <Image
            src={`${sliderData.rightImageBottom}?f_auto,q_auto`}
            alt="Right Bottom"
            fill
            className="object-cover rounded-sm"
            placeholder="blur"
            blurDataURL={`${sliderData.rightImageBottom}?w=10&q=10`}
          />
        </div>
      </div>
    </div>
  );
}
