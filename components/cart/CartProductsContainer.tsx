import { useCartStore } from "@/store/cart-store";
import CartProductCard from "./CartProductCard";

const CartProductsContainer = () => {
  const { items } = useCartStore();

  return (
    <div className="flex flex-col gap-3 mt-5">
      {items.map((item, index) => (
        <CartProductCard
          key={index}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          quantity={item.quantity}
          size={item.size}
        />
      ))}
    </div>
  );
};

export default CartProductsContainer;
