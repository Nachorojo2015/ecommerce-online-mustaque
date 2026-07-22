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

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="relative min-h-80 sm:min-h-125 w-full rounded-sm"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image}
            className="relative cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="Ampliar imagen"
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openLightbox(index);
            }}
          >
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

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Counter, Thumbnails]}
        thumbnails={{ border: 0 }}
      />
    </div>
  );
};

export default ProductImages;
