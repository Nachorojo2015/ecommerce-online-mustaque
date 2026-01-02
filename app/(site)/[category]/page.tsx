import { getProductsByCategory } from "@/actions/products/get-products-by-category";
import ProductsContainer from "@/components/products/ProductsContainer";

interface Params {
  params: {
    category:
      | "buzos"
      | "remerones"
      | "pantalones"
      | "shorts"
      | "conjuntos"
      | "gorros"
      | "medias";
  };
}

export default async function CategoryProductsPage({ params }: Params) {
  const { category } = await params;

  const res = await getProductsByCategory({ category });

  return (
    <div>
      <h1 className="text-center text-4xl font-bold capitalize">{category}</h1>

      <main className="mt-5">
        {!res.ok && <p className="text-center">{res.message}</p>}

        {res.ok && res.products?.length === 0 && (
          <p className="text-center">No hay productos disponibles</p>
        )}

        {res.ok && <ProductsContainer products={res.products} />}
      </main>
    </div>
  );
}
