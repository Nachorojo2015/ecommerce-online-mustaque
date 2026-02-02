"use server";

import { pool } from "@/lib/db";
import { ProductItem } from "@/types";

export const getProducts = async (
  page: number = 1,
  pageSize: number = 8
): Promise<{ products: ProductItem[]; total: number }> => {
  try {
    const offset = (page - 1) * pageSize;

    const productsQuery = pool.query<ProductItem>(
      `
      SELECT
        p.id,
        p.title,
        p.price,
        p.slug,
        json_agg(pi.url_image) AS images
      FROM products p
      JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id
      ORDER BY p.id
      LIMIT $1 OFFSET $2;
      `,
      [pageSize, offset]
    );

    const countQuery = pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM products`
    );

    const [{ rows: products }, { rows: countRows }] =
      await Promise.all([productsQuery, countQuery]);

    return {
      products,
      total: Number(countRows[0].count),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los productos");
  }
};
