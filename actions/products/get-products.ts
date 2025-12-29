"use server";

import { pool } from "@/lib/db";

export const getProducts = async () => {
  try {
    const response = await pool.query(
    `
    SELECT
    p.id,
    p.title,
    p.price,
    p.slug,
    json_agg(pi.url_image) AS images
    FROM products p
    JOIN product_images pi ON pi.product_id = p.id
    GROUP BY p.id, p.title, p.price;
    `
    );

    return {
      ok: true,
      products: response.rows,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "Error al obtener los productos",
    };
  }
};
