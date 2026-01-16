"use server";

import { client } from "@/lib/mercadopago";
import { Size } from "@/types";
import { Preference } from "mercadopago";

interface Parameters {
  items: [
    {
      id: string;
      product_id: string;
      size: Size["size"];
      quantity: number;
      unit_price: number;
      total_price: number;
    },
  ];
  orderId: string;
}

export const createPreference = async ({
  items,
  orderId,
}: Parameters): Promise<string | null> => {
  const preference = new Preference(client);

  const SHIPPING_COST = 7800;

  const products = items.map((item, index) => ({
    id: item.id,
    title: `Producto ${index + 1}`,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  products.push({
    id: "Envio",
    title: "Costo de envio",
    quantity: 1,
    unit_price: SHIPPING_COST,
  });

  try {
    const response = await preference.create({
      body: {
        items: products,
        back_urls: {
          success: "https://www.mercadolibre.com.ar/",
          failure: "https://support.google.com/webmasters/answer/2445990?hl=es",
          pending: "https://translate.google.com/?sl=en&tl=es&op=translate",
        },
        auto_return: "approved",
        metadata: {
          orderId,
        },
      },
    });

    if (!response.id) return null;

    return response.id;
  } catch (error) {
    console.error(error);

    throw new Error("Error al generar la orden de compra");
  }
};
