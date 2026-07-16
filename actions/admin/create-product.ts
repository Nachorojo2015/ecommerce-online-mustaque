"use server";

import { pool } from "@/lib/db";
import { uploadImages } from "@/utils/upload-images";
import { v4 as uuidv4 } from "uuid";

type Category =
  | "buzos"
  | "remerones"
  | "pantalones"
  | "shorts"
  | "conjuntos"
  | "gorros"
  | "medias";

type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

interface Parameters {
  title: string;
  slug: string;
  price: number;
  category: Category;
  genre?: "hombre" | "mujer" | "";
  images: File[];
  sizes: { size: Size; stock: number }[];
}

const CATEGORIES_WITHOUT_SIZES: Category[] = ["gorros", "medias"];

export const createProduct = async ({
  title,
  slug,
  price,
  category,
  genre,
  images,
  sizes,
}: Parameters): Promise<string> => {
  const uploadedImages = await uploadImages(images);

  const client = await pool.connect();
  const productId = uuidv4();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO products (id, slug, title, price, category, genre)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [productId, slug, title, price, category, genre || null]
    );

    for (const image of uploadedImages) {
      await client.query(
        `INSERT INTO product_images (id, product_id, public_id, url_image)
         VALUES ($1, $2, $3, $4)`,
        [uuidv4(), productId, image.publicId, image.url]
      );
    }

    if (!CATEGORIES_WITHOUT_SIZES.includes(category)) {
      for (const { size, stock } of sizes) {
        await client.query(
          `INSERT INTO product_sizes (product_id, size, stock)
           VALUES ($1, $2, $3)`,
          [productId, size, stock]
        );
      }
    }

    await client.query("COMMIT");

    return productId;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);

    throw new Error("Error al crear el producto");
  } finally {
    client.release();
  }
};
