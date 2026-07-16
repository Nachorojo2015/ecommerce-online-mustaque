"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { ProductItem } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: ProductItem[];
}

const ProductsSlider = ({ products }: Props) => {
  if (products.length === 0) return <p className="text-center font-bold">No hay productos disponibles</p>;

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      spaceBetween={16}
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 4 },
      }}
      className="mt-2 pb-2"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;
