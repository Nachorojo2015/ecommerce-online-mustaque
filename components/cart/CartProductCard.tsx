import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { CiTrash } from "react-icons/ci";

interface Props {
  id: string;
  title: string;
  image: string;
  quantity: number;
  size: string;
  price: number;
}

const CartProductCard = ({ id, title, image, quantity, size, price }: Props) => {
    
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="flex items-center gap-2">
      <div className="relative min-h-24 min-w-24">
        <Image
          src={image}
          alt="product-image"
          fill
          className="object-cover rounded-sm"
        />
      </div>

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
