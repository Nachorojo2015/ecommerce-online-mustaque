import { ProductItem } from "@/types";
import { currencyFormat } from "@/utils/currency-format";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductItem }) => {
  return (
    <div className="flex flex-col rounded-sm shadow">
      <div className="relative min-w-72 min-h-96">
        <Image
          src={product.images[0]}
          alt="product-image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col items-center p-2">
        <p className="font-bold">{product.title}</p>
        <p>{currencyFormat(product.price)}</p>

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
