"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

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

  const Skeleton = () => (
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

  if (loading) return <Skeleton />;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ✅ Main Swiper (Responsive Height) */}
        <div className="lg:col-span-2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="w-full rounded-sm overflow-hidden"
          >
            {slider?.sliderImages?.map((imgUrl, index) => (
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

        {/* ✅ Side Images (Hidden on small screens) */}
        <div className="hidden lg:flex flex-col gap-4">
          <img
            src={slider?.rightImageTop}
            alt="Half Sleeve Collection"
            className="w-full h-[270px] object-cover rounded-sm"
          />
          <img
            src={slider?.rightImageBottom}
            alt="Full Sleeve Jersey"
            className="w-full h-[270px] object-cover rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
