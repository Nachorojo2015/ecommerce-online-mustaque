"use server";

import { pool } from "@/lib/db";
import { Order } from "@/types";

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { rows } = await pool.query<Order>(
      `
    SELECT
      o.id,
      o.status,
      o.subtotal,
      o.shipping_cost,
      o.total,
      o.payment_status,
      o.created_at,

      json_build_object(
        'fullname', oa.fullname,
        'email', oa.email,
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
          'product_title', p.title,
          'size', oi.size,
          'quantity', oi.quantity,
          'unit_price', oi.unit_price,
          'total_price', oi.total_price
        )
      ) AS items

    FROM orders o
    JOIN order_address oa ON oa.order_id = o.id
    JOIN order_items oi ON oi.order_id = o.id
    LEFT JOIN products p ON p.id = oi.product_id

    GROUP BY
      o.id,
      oa.fullname,
      oa.email,
      oa.address,
      oa.address2,
      oa.postal_code,
      oa.city,
      oa.phone,
      oa.country

    ORDER BY o.created_at DESC;
    `
    );

    return rows;
  } catch (error) {
    console.error(error);

    throw new Error("Error al obtener las órdenes");
  }
};
