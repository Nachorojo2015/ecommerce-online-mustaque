"use server";

import { pool } from "@/lib/db";
import { ProductItem } from "@/types";

interface Parameters {
  category:
    | "buzos"
    | "remerones"
    | "pantalones"
    | "shorts"
    | "conjuntos"
    | "gorros"
    | "medias";

  page: number;
  pageSize: number;
}

export const getProductsByCategory = async ({
  category,
  page = 1,
  pageSize = 8,
}: Parameters): Promise<{ products: ProductItem[]; total: number }> => {
  try {
    const offset = (page - 1) * pageSize;

    const productsQuery = await pool.query<ProductItem>(
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
    HAVING p.category = $1
    LIMIT $2 OFFSET $3;
    `,
      [category, pageSize, offset],
    );

    const countQuery = pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM products
      WHERE category = $1`,
      [category],
    );

    const [{ rows: products }, { rows: countRows }] = await Promise.all([
      productsQuery,
      countQuery,
    ]);

    return {
      products,
      total: Number(countRows[0].count),
    };
  } catch (error) {
    console.error(error);
    const err = error as Error;

    throw new Error(err.message);
  }
};
