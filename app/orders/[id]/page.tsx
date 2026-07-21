"use client";

import { useOrder } from "@/hooks/use-order";
import { usePreference } from "@/hooks/use-preference";
import { currencyFormat } from "@/utils/currency-format";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "");

const PAYMENT_STATUS_STYLES: Record<string, string> = {
  paid: "badge-success",
  pending: "badge-warning",
  failed: "badge-error",
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  paid: "Pagado",
  pending: "Pendiente",
  failed: "Fallido",
};

export default function OrderPage() {
  const id: string = usePathname().split("/")[2];

  const { loader, order } = useOrder(id);
  const { loader: loaderPreference, preferenceId } = usePreference({
    items: order?.items,
    orderId: order?.id
  });

  if (loader) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
        <div className="skeleton h-10 w-64 mx-auto"></div>
        <div className="skeleton h-48 w-full"></div>
        <div className="skeleton h-48 w-full"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 px-3 text-center">
        <p className="text-lg font-bold">Orden no encontrada</p>
        <p className="text-base-content/60">
          Verificá el enlace o volvé a la tienda para seguir comprando.
        </p>
        <Link href="/" className="btn btn-neutral mt-2">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const status = String(order.payment_status);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <Link href="/" className="btn btn-ghost btn-sm gap-1 -ml-2 mb-2">
        <IoArrowBack size={18} />
        Volver a la tienda
      </Link>

      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-center font-bold text-3xl sm:text-4xl">
          Orden de compra
        </h1>
        <span className={`badge ${PAYMENT_STATUS_STYLES[status] ?? "badge-neutral"}`}>
          {PAYMENT_STATUS_LABELS[status] ?? status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body gap-3">
              <h2 className="card-title text-lg">Dirección de envío</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p>
                  <span className="font-bold">Nombre:</span>{" "}
                  {order.address.fullname}
                </p>
                <p>
                  <span className="font-bold">Teléfono:</span>{" "}
                  {order.address.phone}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {order.address.email}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-bold">Dirección:</span>{" "}
                  {order.address.address}
                  {order.address.address2 && `, ${order.address.address2}`}
                </p>
                <p>
                  <span className="font-bold">Ciudad:</span>{" "}
                  {order.address.city}
                </p>
                <p>
                  <span className="font-bold">Código postal:</span>{" "}
                  {order.address.postal_code}
                </p>
                <p>
                  <span className="font-bold">País:</span>{" "}
                  {order.address.country}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body gap-4">
              <h2 className="card-title text-lg">
                Productos ({order.items.length})
              </h2>

              <div className="flex flex-col divide-y divide-base-300">
                {order.items.map((item, index) => (
                  <div
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                    key={item.id}
                  >
                    <div className="flex flex-col gap-0.5 text-sm">
                      <p className="font-bold">Producto {index + 1}</p>
                      <p className="text-base-content/70">
                        Talle: {item.size} · Cantidad: {item.quantity}
                      </p>
                      <p className="text-base-content/70">
                        Precio único: {currencyFormat(item.unit_price)}
                      </p>
                    </div>

                    <p className="font-bold text-sm shrink-0">
                      {currencyFormat(item.total_price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-6 flex flex-col gap-6">
          <div className="card bg-base-200">
            <div className="card-body gap-3">
              <h2 className="card-title text-lg">Resumen</h2>

              <div className="flex items-center justify-between text-sm">
                <p className="text-base-content/70">Subtotal</p>
                <p>{currencyFormat(order.subtotal)}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="text-base-content/70">Envío</p>
                <p>{currencyFormat(order.shipping_cost)}</p>
              </div>

              <div className="divider my-0"></div>

              <div className="flex items-center justify-between text-xl font-bold">
                <p>Total</p>
                <p>{currencyFormat(order.total)}</p>
              </div>
            </div>
          </div>

          {status !== "paid" && (
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body gap-3 items-center">
                <h2 className="card-title text-lg">Completar pago</h2>

                {loaderPreference ? (
                  <div className="skeleton w-full h-12"></div>
                ) : (
                  <div className="w-full">
                    <Wallet initialization={{ preferenceId: preferenceId ?? "" }} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
