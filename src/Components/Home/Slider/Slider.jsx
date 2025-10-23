"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/Components/Shared/LoadingSpiner";

export default function Slider() {
  const [slider, setSlider] = useState(null);
  const [loading, setLoading] = useState(true);


  

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const res = await fetch("/api/homeslider");
        const json = await res.json();

        if (json.success && json.data.length > 0) {
          setSlider(json.data[0]);
        }
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

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
            className="w-full h-[455px] md:h-[500px] lg:h-[555px] rounded-sm overflow-hidden"
          >
            {slider?.sliderImages?.map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgUrl}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Images */}
        <div className="hidden lg:flex flex-col gap-4">
          <img
            src={slider?.rightImageTop}
            alt="Half Sleeve Collection"
            className="w-full md:h-[500px] lg:h-[270px] object-cover rounded-sm"
          />
          <img
            src={slider?.rightImageBottom}
            alt="Full Sleeve Jersey"
            className="w-full md:h-[500px] lg:h-[270px] object-cover rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
