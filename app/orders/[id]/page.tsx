"use client";

import { useOrder } from "@/hooks/use-order";
import { usePreference } from "@/hooks/use-preference";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { usePathname } from "next/navigation";

initMercadoPago(process.env.NEXT_PUBLIC_TEST_PUBLIC_KEY ?? "");

export default function OrderPage() {
  const id: string = usePathname().split("/")[2];

  const { loader, order } = useOrder(id);
  const { loader: loaderPreference, preferenceId } = usePreference({
    items: order?.items,
    orderId: order?.id
  });

  if (loader) return <p>Cargando...</p>;

  if (!order) return <p>Orden no encontrada</p>;

  return (
    <div className="p-3">
      <h1 className="text-center font-bold text-4xl">Orden de compra</h1>

      <div>
        <h2 className="text-3xl">Datos</h2>
        <p>Estado de orden: {order.payment_status}</p>
        <p>Subtotal: ${order.subtotal}</p>
        <p>Costo de envío: ${order.shipping_cost}</p>
        <p>Total: ${order.total}</p>

        <div className="divider"></div>

        <p>Direccion de envío: {order.address.address}</p>
        <p>Dirección de envío 2 (opcional): {order.address.address2}</p>
        <p>Nombre del comprador: {order.address.fullname}</p>
        <p>Ciudad: {order.address.city}</p>
        <p>Teléfono: {order.address.phone}</p>
        <p>Código postal: {order.address.postal_code}</p>
        <p>País: {order.address.country}</p>

        <div className="divider"></div>

        {order.items.map((item, index) => (
          <div className="flex items-center gap-2" key={item.id}>
            <div>
              <p className="font-bold">Producto {index + 1}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Talle: {item.size}</p>
              <p>Precio único: ${item.unit_price}</p>
              <p>Precio total: ${item.total_price}</p>
            </div>
          </div>
        ))}

        <div className="divider"></div>

        {loaderPreference ? (
          <div className="skeleton w-75 h-12 mx-auto"></div>
        ) : (
          <div className="w-75 mx-auto">
            <Wallet initialization={{ preferenceId: preferenceId ?? '' }} />
          </div>
        )}
      </div>
    </div>
  );
}
