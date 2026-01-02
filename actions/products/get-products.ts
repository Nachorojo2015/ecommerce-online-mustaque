"use server";

import { pool } from "@/lib/db";
import { ProductItem } from "@/types";

interface GetProductsSuccess {
  ok: true;
  products: ProductItem[];
}

interface GetProductsError {
  ok: false;
  message: string;
}

type GetProductsResponse = GetProductsSuccess | GetProductsError;

export const getProducts = async (): Promise<GetProductsResponse> => {
  try {
    const response = await pool.query<ProductItem>(`
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
