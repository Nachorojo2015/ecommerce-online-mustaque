"use client";

import { useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Navigation, Thumbs } from "swiper/modules";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="relative min-h-80 sm:min-h-125 w-full rounded-sm"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} className="relative">
            <Image
              src={image}
              alt={`product-image-${index + 1}`}
              fill
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView={4}
          spaceBetween={8}
          modules={[Thumbs]}
          className="h-20 w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image}
              className="relative h-20 rounded-sm overflow-hidden cursor-pointer"
            >
              <Image
                src={image}
                alt={`product-thumbnail-${index + 1}`}
                fill
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImages;
