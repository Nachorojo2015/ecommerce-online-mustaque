"use server";

import { client } from "@/lib/mercadopago";
import { pool } from "@/lib/db";
import { OrderItem } from "@/types";
import { Preference } from "mercadopago";

interface Parameters {
  items: OrderItem[];
  orderId: string;
}

export const createPreference = async ({
  items,
  orderId,
}: Parameters): Promise<string | null> => {
  const domainUrl = process.env.DOMAIN_URL;

  if (!domainUrl) {
    throw new Error("DOMAIN_URL no está configurada: es requerida para generar las back_urls de Mercado Pago");
  }

  // Camino rápido: si la orden ya tiene una preferencia, se reutiliza en vez
  // de crear una nueva cada vez que se visita /orders/[id].
  const { rows: existingRows, rowCount: existingCount } = await pool.query(
    `SELECT preference_id FROM orders WHERE id = $1`,
    [orderId]
  );

  if (existingCount === 0) {
    throw new Error("Orden no encontrada");
  }

  if (existingRows[0].preference_id) {
    return existingRows[0].preference_id;
  }

  // Camino lento (solo la primera vez): se toma un lock de fila para que dos
  // pedidos concurrentes por la misma orden (doble click, dos pestañas) no
  // terminen creando dos preferencias distintas.
  const dbClient = await pool.connect();

  try {
    await dbClient.query("BEGIN");

    const { rows } = await dbClient.query(
      `SELECT preference_id FROM orders WHERE id = $1 FOR UPDATE`,
      [orderId]
    );

    if (rows[0]?.preference_id) {
      await dbClient.query("COMMIT");
      return rows[0].preference_id;
    }

    const preference = new Preference(client);

    const products = items.map((item) => ({
      id: item.product_id,
      title: item.product_title ?? "Producto",
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: "ARS",
    }));

    const response = await preference.create({
      body: {
        items: products,
        external_reference: orderId,
        back_urls: {
          success: `${domainUrl}/orders/${orderId}`,
          failure: `${domainUrl}/orders/${orderId}`,
          pending: `${domainUrl}/orders/${orderId}`,
        },
        auto_return: "approved",
      },
      // Evita que un reintento de red (no un doble click, ya cubierto por el
      // lock de fila) le pida a Mercado Pago crear dos preferencias para la
      // misma orden.
      requestOptions: { idempotencyKey: orderId },
    });

    if (!response.id) {
      await dbClient.query("ROLLBACK");
      return null;
    }

    await dbClient.query(
      `UPDATE orders SET preference_id = $1 WHERE id = $2`,
      [response.id, orderId]
    );

    await dbClient.query("COMMIT");

    return response.id;
  } catch (error) {
    await dbClient.query("ROLLBACK");
    console.error(error);

    throw new Error("Error al generar la orden de compra");
  } finally {
    dbClient.release();
  }
};
