"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const images = [
  {
    id: 1,
    src: "/slider-mobile-images/expect-1.jpg",
  },
  {
    id: 2,
    src: "/slider-mobile-images/expect-2.jpg",
  },
  {
    id: 3,
    src: "/slider-mobile-images/expect-3.jpg",
  },
  {
    id: 4,
    src: "/slider-mobile-images/expect-4.jpg",
  },
  {
    id: 5,
    src: "/slider-mobile-images/expect-5.jpg",
  },
  {
    id: 6,
    src: "/slider-mobile-images/expect-6.jpg",
  },
];

const SliderMobile = () => {
  return (
    <Swiper autoplay={true} navigation={true} modules={[Navigation, Autoplay]} className="h-150 rounded-lg mt-2">
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <Image
            src={image.src}
            alt="slider-image"
            fill
            className="object-cover"
            style={{ filter: "brightness(70%)" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderMobile;
