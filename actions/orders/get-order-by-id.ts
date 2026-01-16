"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { pool } from "@/lib/db";
import { Order } from "@/types";

interface Parameters {
  id: string;
}

export const getOrderById = async ({ id }: Parameters): Promise<Order> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("No autorizado");
  }

  try {
    const { rowCount, rows } = await pool.query(
      `
    SELECT
      o.id,
      o.status,
      o.subtotal,
      o.shipping_cost,
      o.total,
      o.payment_status,

      json_build_object(
        'fullname', oa.fullname,
        'address', oa.address,
        'address2', oa.address2,
        'postal_code', oa.postal_code,
        'city', oa.city,
        'phone', oa.phone,
        'country', oa.country
      ) AS address,

      json_agg(
        json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'size', oi.size,
          'quantity', oi.quantity,
          'unit_price', oi.unit_price,
          'total_price', oi.total_price
        )
      ) AS items

    FROM orders o
    JOIN order_address oa ON oa.order_id = o.id
    JOIN order_items oi ON oi.order_id = o.id

    WHERE o.id = $1
    AND o.user_id = $2

    GROUP BY
      o.id,
      oa.fullname,
      oa.address,
      oa.address2,
      oa.postal_code,
      oa.city,
      oa.phone,
      oa.country;    
    `,
      [id, session.user.id]
    );

    if (rowCount === 0) {
      throw new Error("No se encontro la orden");
    }

    return rows[0];
  } catch (error) {
    console.error(error);

    throw new Error("Error al obtener la orden");
  }
};
