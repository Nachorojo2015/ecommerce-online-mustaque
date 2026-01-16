"use server";

import { pool } from "@/lib/db";
import { ProductItem } from "@/types";

export const getProducts = async (): Promise<ProductItem[]> => {
  try {
    const { rows } = await pool.query<ProductItem>(`
      SELECT
        p.id,
        p.title,
        p.price,
        p.slug,
        json_agg(pi.url_image) AS images
      FROM products p
      JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id, p.title, p.price, p.slug;
    `);

    return rows;
  } catch (error) {
    console.error(error);

    throw new Error("Error al obtener los productos");
  }
};
