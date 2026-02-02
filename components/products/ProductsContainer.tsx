import { ProductItem } from "@/types";
import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductsContainer = ({
  products,
  page,
  total,
  pageSize,
  basePath
}: {
  products: ProductItem[];
  page: number;
  total: number;
  pageSize: number;
  basePath?: string;
}) => {
  const totalPages = Math.ceil(total / pageSize);

  if (products.length === 0) {
    return <p className="text-center font-bold">No hay productos disponibles</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-4 mt-8">
        {page > 1 && (
          <Link href={`${basePath ?? ''}/?page=${page - 1}`}>
            <button className="px-4 py-2 border rounded">
              ← Anterior
            </button>
          </Link>
        )}

        <span className="self-center font-medium">
          Página {page} de {totalPages}
        </span>

        {page < totalPages && (
          <Link href={`${basePath ?? ''}/?page=${page + 1}`}>
            <button className="px-4 py-2 border rounded">
              Siguiente →
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
