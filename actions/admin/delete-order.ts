"use server";

import { pool } from "@/lib/db";

export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await pool.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
  } catch (error) {
    console.error(error);

    throw new Error("Error al borrar la orden");
  }
};
