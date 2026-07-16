"use client";

import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { createProduct } from "@/actions/admin/create-product";

const CATEGORIES = [
  "buzos",
  "remerones",
  "pantalones",
  "shorts",
  "conjuntos",
  "gorros",
  "medias",
] as const;

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

interface FormData {
  title: string;
  slug: string;
  price: number;
  category: (typeof CATEGORIES)[number] | "";
  genre: "hombre" | "mujer" | "";
  images: FileList | null;
  sizes: { size: (typeof SIZES)[number]; stock: number }[];
}

export default function CrearProductoPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      slug: "",
      price: 0,
      category: "",
      genre: "",
      images: null,
      sizes: SIZES.map((size) => ({ size, stock: 0 })),
    },
  });

  const category = useWatch({ control, name: "category" });
  const hasSizes = category !== "gorros" && category !== "medias";

  const onSubmit = async (data: FormData) => {
    try {
      await createProduct({
        title: data.title,
        slug: data.slug,
        price: data.price,
        category: data.category as (typeof CATEGORIES)[number],
        genre: data.genre,
        images: Array.from(data.images ?? []),
        sizes: data.sizes,
      });

      toast.success("Producto creado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el producto");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Crear producto</h1>

      <form
        className="flex flex-col gap-6 max-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="label">Título</label>
          <input
            type="text"
            placeholder="Título del producto"
            className="input w-full outline-none"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col">
          <label className="label">Slug</label>
          <input
            type="text"
            placeholder="slug-del-producto"
            className="input w-full outline-none"
            {...register("slug", {
              required: true,
              pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            })}
          />
        </div>

        <div className="flex flex-col">
          <label className="label">Precio</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Precio"
            className="input w-full outline-none"
            {...register("price", { required: true, valueAsNumber: true, min: 0 })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="label">Categoría</label>
            <select
              className="select w-full"
              {...register("category", { required: true })}
            >
              <option value="" disabled>
                Seleccionar categoría
              </option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="label">Género (opcional)</label>
            <select className="select w-full" {...register("genre")}>
              <option value="">Sin especificar</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="label">Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="file-input file-input-neutral w-full"
            {...register("images", { required: true })}
          />
        </div>

        {hasSizes && (
          <div className="flex flex-col gap-2">
            <label className="label">Stock por talle</label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SIZES.map((size, index) => (
                <div key={size} className="flex flex-col">
                  <label className="label">{size}</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Stock"
                    className="input w-full outline-none"
                    {...register(`sizes.${index}.stock`, {
                      valueAsNumber: true,
                      min: 0,
                    })}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="btn btn-neutral w-full mt-4"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Crear producto"
          )}
        </button>
      </form>
    </div>
  );
}
