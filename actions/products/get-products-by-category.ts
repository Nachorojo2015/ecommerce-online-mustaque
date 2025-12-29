"use server";

import { pool } from "@/lib/db";

interface Parameters {
  category:
    | "buzos"
    | "remerones"
    | "pantalones"
    | "shorts"
    | "conjuntos"
    | "gorros"
    | "medias";
}

export const getProductsByCategory = async ({ category }: Parameters) => {
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
    GROUP BY p.id, p.title, p.price
    HAVING p.category = $1;
    `,
    [category]
    );

    return {
      ok: true,
      products: response.rows,
    };
  } catch (error) {
    console.error(error);
    const err = error as Error;

    return {
      ok: false,
      message: err.message,
    };
  }
};
