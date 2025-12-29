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

interface Products {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
}

export default async function CategoryProductsPage({ params }: Params) {
  const { category } = await params;

  const { ok, message, products } = await getProductsByCategory({ category });

  console.log(products);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold capitalize">{category}</h1>

      <main className="mt-5">
        {!ok && <p className="text-center">{message}</p>}

        {products?.length === 0 && (
          <p className="text-center">No hay productos disponibles</p>
        )}

        <ProductsContainer products={products as Products[]} />
      </main>
    </div>
  );
}
