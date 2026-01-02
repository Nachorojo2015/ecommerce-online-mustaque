import { ProductItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductItem }) => {
  return (
    <div className="flex flex-col rounded-sm shadow">
      <div className="relative min-w-72 min-h-72">
        <Image
          src={product.images[0]}
          alt="product-image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center p-2">
        <p className="font-bold">{product.title}</p>
        <p>${product.price}</p>

        <Link
          href={`/product/${product.slug}`}
          className="link transition hover:font-bold"
        >
          Ver más detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
