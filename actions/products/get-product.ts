"use server";

import { pool } from "@/lib/db";
import { Product } from "@/types";

interface Parameters {
  slug: string;
}

export const getProduct = async ({ slug }: Parameters): Promise<Product> => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        p.id,
        p.title,
        p.price,
        p.slug,
        p.category,

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

    return rows[0]
  } catch (error) {
    console.error(error);

    throw new Error("Error al obtener el producto");
  }
};
