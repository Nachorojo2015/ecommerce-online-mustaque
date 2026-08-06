"use client";

import { usePreference } from "@/hooks/use-preference";
import { Order } from "@/types";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "");

interface Props {
  order: Order;
}

const MercadoPagoPayment = ({ order }: Props) => {
  const { loader, preferenceId } = usePreference({
    items: order.items,
    orderId: order.id,
    existingPreferenceId: order.preference_id,
  });

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body gap-3 items-center">
        <h2 className="card-title text-lg">Completar pago</h2>

        {loader ? (
          <div className="skeleton w-full h-12"></div>
        ) : (
          <div className="w-full">
            <Wallet initialization={{ preferenceId: preferenceId ?? "" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MercadoPagoPayment;
