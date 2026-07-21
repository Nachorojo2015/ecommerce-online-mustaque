"use client";

import { generateOrder } from "@/actions/orders/generate-order";
import { useCartStore } from "@/store/cart-store";
import { useCheckout } from "@/store/checkout-store";
import { currencyFormat } from "@/utils/currency-format";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

const SHIPPING_COST = 1;

export default function CheckoutPage() {
  const stored = useCheckout((state) => state);

  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getTotal();
  const total = subtotal + SHIPPING_COST;

  const [loader, setLoader] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 px-3 text-center">
        <p className="text-lg font-bold">No tienes nada en tu carrito</p>
        <p className="text-base-content/60">
          Agrega productos para continuar con la compra.
        </p>
        <Link href="/" className="btn btn-neutral mt-2">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  if (!stored.address) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 px-3 text-center">
        <p className="text-lg font-bold">Todavía no cargaste tus datos de envío</p>
        <p className="text-base-content/60">
          Completa tu dirección para poder continuar con la compra.
        </p>
        <Link href="/checkout/address" className="btn btn-neutral mt-2">
          Cargar dirección de envío
        </Link>
      </div>
    );
  }

  const onGenerateOrder = async () => {
    setLoader(true);

    const orderId = await generateOrder({
      subtotal,
      shipping_cost: SHIPPING_COST,
      total,
      fullname: stored.fullname,
      email: stored.email,
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
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <Link
        href="/"
        className="btn btn-ghost btn-sm gap-1 -ml-2 mb-2"
      >
        <IoArrowBack size={18} />
        Volver a la tienda
      </Link>

      <h1 className="text-center font-bold text-3xl sm:text-4xl mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body gap-3">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-lg">Dirección de envío</h2>
                <Link
                  href="/checkout/address"
                  className="btn btn-ghost btn-sm gap-1"
                >
                  <CiEdit size={18} />
                  Editar
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p>
                  <span className="font-bold">Nombre:</span> {stored.fullname}
                </p>
                <p>
                  <span className="font-bold">Teléfono:</span> {stored.phone}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {stored.email}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-bold">Dirección:</span>{" "}
                  {stored.address}
                  {stored.address2 && `, ${stored.address2}`}
                </p>
                <p>
                  <span className="font-bold">Ciudad:</span> {stored.city}
                </p>
                <p>
                  <span className="font-bold">Código postal:</span>{" "}
                  {stored.postalCode}
                </p>
                <p>
                  <span className="font-bold">País:</span> {stored.country}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body gap-4">
              <h2 className="card-title text-lg">
                Productos ({items.length})
              </h2>

              <div className="flex flex-col divide-y divide-base-300">
                {items.map((item) => (
                  <div
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    key={`${item.id}-${item.size}`}
                  >
                    <div className="relative min-h-24 min-w-24 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5 text-sm">
                      <p className="font-bold">{item.title}</p>
                      <p className="text-base-content/70">
                        Talle: {item.size} · Cantidad: {item.quantity}
                      </p>
                      <p className="font-bold">
                        {currencyFormat(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-6">
          <div className="card bg-base-200">
            <div className="card-body gap-3">
              <h2 className="card-title text-lg">Resumen</h2>

              <div className="flex items-center justify-between text-sm">
                <p className="text-base-content/70">Subtotal</p>
                <p>{currencyFormat(subtotal)}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="text-base-content/70">Envío</p>
                <p>{currencyFormat(SHIPPING_COST)}</p>
              </div>

              <div className="divider my-0"></div>

              <div className="flex items-center justify-between text-xl font-bold">
                <p>Total</p>
                <p>{currencyFormat(total)}</p>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
