"use server";

import { pool } from "@/lib/db";
import { SHIPPING_COST } from "@/lib/constants";
import { v4 as uuidv4 } from 'uuid';

interface OrderItemInput {
  id: string;
  size: string;
  quantity: number;
}

interface Parameters {
  fullname: string;
  email: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  phone: string;
  country: string;
  items: OrderItemInput[];
}

export const generateOrder = async ({ fullname, email, address, address2, postalCode, city, phone, country, items }: Parameters): Promise<string> => {
  const client = await pool!.connect()

  const orderId = uuidv4();
  const orderAddressId = uuidv4();

  try {
    await client.query("BEGIN");

    // El precio y el stock se revalidan acá contra la base de datos: nunca se
    // confía en el unit_price/total_price que pueda mandar el cliente.
    let subtotal = 0;
    const orderItems: {
      id: string;
      product_id: string;
      size: string;
      quantity: number;
      unit_price: number;
      total_price: number;
    }[] = [];

    for (const item of items) {
      const { rows: productRows, rowCount: productCount } = await client.query(
        `SELECT price FROM products WHERE id = $1`,
        [item.id]
      );

      if (productCount === 0) {
        throw new Error(`El producto ${item.id} no existe`);
      }

      const unitPrice = Number(productRows[0].price);

      // UPDATE atómico: la condición "stock >= $1" hace que, bajo pedidos
      // concurrentes por el mismo talle, solo uno logre reservar el stock
      // (Postgres serializa vía el lock de fila del UPDATE).
      const { rowCount: stockReserved } = await client.query(
        `UPDATE product_sizes
         SET stock = stock - $1
         WHERE product_id = $2 AND size = $3 AND stock >= $1`,
        [item.quantity, item.id, item.size]
      );

      if (stockReserved === 0) {
        throw new Error(`No hay stock suficiente para el producto ${item.id} (talle ${item.size})`);
      }

      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      orderItems.push({
        id: uuidv4(),
        product_id: item.id,
        size: item.size,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      });
    }

    const total = subtotal + SHIPPING_COST;

    await client.query(`INSERT INTO orders (id, subtotal, shipping_cost, total)
                        VALUES ($1, $2, $3, $4)`, [orderId, subtotal, SHIPPING_COST, total]);

    await client.query(`INSERT INTO order_address (id, order_id, fullname, email, address, address2, postal_code, city, phone, country)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [orderAddressId, orderId, fullname, email, address, address2, postalCode, city, phone, country]);

    for (const item of orderItems) {
      await client.query(`INSERT INTO order_items (id, order_id, product_id, size, quantity, unit_price, total_price)
                          VALUES ($1, $2, $3, $4, $5, $6, $7)`, [item.id, orderId, item.product_id, item.size, item.quantity, item.unit_price, item.total_price]);
    }

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
