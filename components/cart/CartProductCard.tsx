import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";

interface Props {
  id: string;
  slug: string;
  title: string;
  image: string;
  quantity: number;
  size: string;
  price: number;
}

const CartProductCard = ({ id, slug, title, image, quantity, size, price }: Props) => {
    
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="my-drawer-5" onClick={() => router.push(`/product/${slug}`)} className="relative min-h-24 min-w-24 cursor-pointer">
        <Image
          src={image}
          alt="product-image"
          fill
          className="object-cover rounded-sm"
        />
      </label>

      <div className="flex flex-col gap-1">
        <p className="font-bold">{title}</p>
        <p>Talle: {size}</p>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={() => increaseQuantity(id, size)}>+</button>
          <span>{quantity}</span>
          <button className="btn" onClick={() => decreaseQuantity(id, size)}>-</button>
        </div>
        <p className="font-semibold">${price}</p>
      </div>

      <CiTrash size={24} className="ml-auto cursor-pointer" onClick={() => removeItem(id, size)} />
    </div>
  );
};

export default CartProductCard;
