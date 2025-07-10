"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "/slider-1.jpg",
    title: "OUR PERSONAL QUALITY TAYLER",
    smallText: "Welcome to Quality Tayler",
    buttonText: "DISCOVER MORE",
  },
  {
    image: "/slider-2.jpg",
    title: "ELEGANT STYLE",
    smallText: "CREATE YOUR OWN PERSONAL STYLE",
    buttonText: "EXPLORE STYLES",
  },
  {
    image: "/slider-3.jpg",
    title: "MODERN LOOK",
    smallText: "Suits That Define You",
    buttonText: "VIEW COLLECTION",
  },
];


const textVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

const smallTextVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
};

const buttonVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        effect="fade"
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[EffectFade, Pagination, Autoplay]}
        className="w-full aspect-[16/9] md:aspect-[21/9]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center px-6 md:px-20 bg-black/30">
                {index === activeIndex && (
                  <motion.div
                    key={activeIndex} // animation re-trigger on change
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 1 }}
                    variants={textVariants}
                    className="text-white text-center max-w-2xl space-y-4"
                  >
                    <motion.p
                      variants={smallTextVariants}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="text-orange-300 text-sm md:text-base"
                    >
                      {slide.smallText}
                    </motion.p>
                    <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <motion.button
                      variants={buttonVariants}
                      transition={{ duration: 1, delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-white text-white px-6 py-2 mt-4 cursor-pointer"
                    >
                      {slide.buttonText}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
