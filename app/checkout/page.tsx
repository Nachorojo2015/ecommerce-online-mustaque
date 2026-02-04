"use client";

import { generateOrder } from "@/actions/orders/generate-order";
import { useCartStore } from "@/store/cart-store";
import { useCheckout } from "@/store/checkout-store";
import { currencyFormat } from "@/utils/currency-format";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const stored = useCheckout((state) => state);

  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);

  const total = getTotal();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (stored && !stored.address) {
      redirect("/checkout/address");
    }
  }, [stored, items]);

  if (items.length === 0) {
    return <p>No tienes nada en tu carrito</p>;
  }

  const onGenerateOrder = async () => {
    setLoader(true);

    const orderId = await generateOrder({
      subtotal: getTotal(),
      shipping_cost: 1,
      total: getTotal()  + 1,
      fullname: stored.fullname,
      address: stored.address,
      address2: stored.address2,
      postalCode: stored.postalCode,
      city: stored.city,
      phone: stored.phone,
      country: stored.country,
      items,
    });

    setLoader(false);

    redirect(`/orders/${orderId}`);
  };

  return (
    <div className="p-3">
      <h1 className="text-center font-bold text-4xl">Checkout</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 shadow rounded-sm p-2 h-fit">
            <p>
              <b className="font-bold">Direccion de envío:</b> {stored.address}
            </p>
            <p>
              <b className="font-bold">Dirección de envío 2 (opcional):</b>{" "}
              {stored.address2}
            </p>
            <p>
              <b className="font-bold">Nombre del comprador:</b>{" "}
              {stored.fullname}
            </p>
            <p>
              <b className="font-bold">Ciudad:</b> {stored.city}
            </p>
            <p>
              <b className="font-bold">Teléfono:</b> {stored.phone}
            </p>
            <p>
              <b className="font-bold">Código postal:</b> {stored.postalCode}
            </p>
            <p>
              <b className="font-bold">País:</b> {stored.country}
            </p>
          </div>
          <Link href={"/checkout/address"} className="link text-blue-500">
            Indicar otra dirección de envio
          </Link>
        </div>

        <div className="flex flex-col gap-2 bg-base-200 p-2 rounded-sm">
          {items.map((item) => (
            <div className="flex items-center gap-2" key={item.id}>
              <div className="relative min-h-32 min-w-32">
                <Image
                  src={item.image}
                  alt="product-image"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>

              <div>
                <p className="font-bold">{item.title}</p>
                <p>
                  <b className="font-bold">Cantidad:</b> {item.quantity}
                </p>
                <p>
                  <b className="font-bold">Talle:</b> {item.size}
                </p>
                <p>
                  <b className="font-bold">Precio:</b> {currencyFormat(item.price)}
                </p>
              </div>
            </div>
          ))}

          <div>
            <p>
              <b className="font-bold">Total:</b> {currencyFormat(total)}
            </p>
          </div>

          <button disabled={loader} className="btn btn-primary" onClick={onGenerateOrder}>
            Continuar compra
          </button>
        </div>
      </div>
    </div>
  );
}
