"use client";

import { generateOrder } from "@/actions/orders/generate-order";
import { useCartStore } from "@/store/cart-store";
import { useCheckout } from "@/store/checkout-store";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const GenerateOrderButton = () => {
  const stored = useCheckout((state) => state);
  const items = useCartStore((state) => state.items);

  const [loader, setLoader] = useState(false);

  const onGenerateOrder = async () => {
    setLoader(true);

    let orderId: string;

    try {
      orderId = await generateOrder({
        fullname: stored.fullname,
        email: stored.email,
        address: stored.address,
        address2: stored.address2,
        postalCode: stored.postalCode,
        city: stored.city,
        phone: stored.phone,
        country: stored.country,
        items: items.map((item) => ({
          id: item.id,
          size: item.size,
          quantity: item.quantity,
        })),
      });
    } catch {
      setLoader(false);
      toast.error(
        "No pudimos generar tu orden. Puede que no haya stock suficiente de algún producto del carrito — revisalo e intentá de nuevo."
      );
      return;
    }

    redirect(`/orders/${orderId}`);
  };

  return (
    <button
      disabled={loader}
      className="btn btn-primary mt-2"
      onClick={onGenerateOrder}
    >
      {loader ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Continuar compra"
      )}
    </button>
  );
};

export default GenerateOrderButton;
