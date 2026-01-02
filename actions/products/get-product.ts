"use server";

import { pool } from "@/lib/db";
import { Product } from "@/types";

interface GetProductSuccess {
  ok: true;
  product: Product;
}

interface GetProductError {
  ok: false;
  message: string;
}

type GetProductResponse = GetProductSuccess | GetProductError;

interface Parameters {
  slug: string;
}

export const getProduct = async ({ slug }: Parameters): Promise<GetProductResponse> => {
  try {
    const response = await pool.query(
      `
      SELECT
        p.id,
        p.title,
        p.price,

        -- imágenes del producto
        (
          SELECT json_agg(pi.url_image)
          FROM product_images pi
          WHERE pi.product_id = p.id
        ) AS images,

        -- talles y stock
        (
          SELECT json_agg(
            jsonb_build_object(
              'size', ps.size,
              'stock', ps.stock
            )
          )
          FROM product_sizes ps
          WHERE ps.product_id = p.id
        ) AS sizes

      FROM products p
      WHERE p.slug = $1
    `,
      [slug]
    );

    return {
      ok: true,
      product: response.rows[0],
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "Error al obtener el producto",
    };
  }
};
