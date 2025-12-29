import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  price: number;
  slug: string;
  images: string[];
}

const ProductCard = ({ title, price, slug, images }: Props) => {
  return (
    <div className="flex flex-col rounded-sm shadow">
      <div className="relative min-w-72 min-h-72">
        <Image
          src={images[0]}
          alt="product-image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center p-2">
        <p className="font-bold">{title}</p>
        <p>${price}</p>

        <Link href={`/product/${slug}`} className="link transition hover:font-bold">
          Ver más detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
