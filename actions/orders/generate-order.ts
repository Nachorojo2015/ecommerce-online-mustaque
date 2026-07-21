"use server";

import { auth } from "@/lib/auth";
import { CartItem } from "@/store/cart-store";
import { headers } from "next/headers";
import { pool } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

interface Parameters {
  subtotal: number;
  shipping_cost: number;
  total: number;
  fullname: string;
  email: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  phone: string;
  country: string;
  items: CartItem[];
}

export const generateOrder = async ({ subtotal, shipping_cost, total, fullname, email, address, address2, postalCode, city, phone, country, items }: Parameters): Promise<string> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("No autorizado");
  }

  const client = await pool!.connect()

  const orderId = uuidv4();
  const orderAddressId = uuidv4();

  try {
    await client.query("BEGIN");

    await client.query(`INSERT INTO orders (id, user_id, subtotal, shipping_cost, total)
                        VALUES ($1, $2, $3, $4, $5)`, [orderId, session.user.id, subtotal, shipping_cost, total]);

    await client.query(`INSERT INTO order_address (id, order_id, fullname, email, address, address2, postal_code, city, phone, country)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [orderAddressId, orderId, fullname, email, address, address2, postalCode, city, phone, country]);
    
    items.forEach(async (product) => {
        const orderItemsId = uuidv4();
        await client.query(`INSERT INTO order_items (id, order_id, product_id, size, quantity, unit_price, total_price)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)`, [orderItemsId, orderId, product.id, product.size, product.quantity, product.price, (product.price * product.quantity)]);
    })

    await client.query("COMMIT");

    return orderId;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);

    throw new Error("Error al crear la orden");
  } finally {
    client.release();
  }
};
