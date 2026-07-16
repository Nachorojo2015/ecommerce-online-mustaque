"use server";

import { pool } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const { rows: images } = await pool.query<{ public_id: string }>(
      `SELECT public_id FROM product_images WHERE product_id = $1`,
      [productId]
    );

    await Promise.all(
      images.map(({ public_id }) => cloudinary.uploader.destroy(public_id))
    );

    await pool.query(`DELETE FROM products WHERE id = $1`, [productId]);
  } catch (error) {
    console.error(error);

    throw new Error("Error al borrar el producto");
  }
};
