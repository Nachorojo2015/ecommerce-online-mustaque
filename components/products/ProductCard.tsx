import { ProductItem } from "@/types";
import { currencyFormat } from "@/utils/currency-format";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductItem }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-base-200 bg-base-100 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-base-200">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-1 p-3">
        <p className="line-clamp-2 text-sm font-medium">{product.title}</p>
        <p className="font-bold">{currencyFormat(product.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
