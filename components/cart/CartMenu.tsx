"use client";

import { useCartStore } from "@/store/cart-store";
import { CiShoppingCart } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import CartProductsContainer from "./CartProductsContainer";
import { useRouter } from "next/navigation";

const CartMenu = () => {
  const { items } = useCartStore();
  const getTotal = useCartStore((state) => state.getTotal);

  const router = useRouter();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="drawer-button">
          {items.length > 0 ? (
            <div className="relative">
              <CiShoppingCart className="cursor-pointer" size={30} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                {items.length}
              </span>
            </div>
          ) : (
            <CiShoppingCart className="cursor-pointer" size={30} />
          )}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <label htmlFor="my-drawer-5" className="w-fit ml-auto">
            <IoClose size={30} className="cursor-pointer" />
          </label>

          <h1 className="text-center font-bold text-2xl">Carrito de compras</h1>

          {items.length > 0 ? (
            <CartProductsContainer />
          ) : (
            <p className="text-center mt-10">
              El carrito de compras está vacío
            </p>
          )}

          <div className="divider"></div>

          <div className="mt-auto flex flex-col gap-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p>Producto</p>
                <p>${item.price}</p>
              </div>
            ))}

            {items.length > 0 && (
              <div className="flex items-center justify-between">
                <p>Envío</p>
                <p>El costo se calculará más adelante</p>
              </div>
            )}

            {items.length > 0 && (
              <div className="flex items-center justify-between text-xl font-bold">
                <p>Total:</p>
                <p>${getTotal()}</p>
              </div>
            )}
          </div>

          <label htmlFor="my-drawer-5" className="btn btn-neutral" onClick={() => router.push('/checkout')}>
            Checkout
          </label>
        </ul>
      </div>
    </div>
  );
};

export default CartMenu;
