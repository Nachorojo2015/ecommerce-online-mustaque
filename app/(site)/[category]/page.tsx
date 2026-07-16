import { getProductsByCategory } from "@/actions/products/get-products-by-category";
import ProductsContainer from "@/components/products/ProductsContainer";

interface PageProps {
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

export default async function CategoryProductsPage({ params }: PageProps) {
  const { category } = await params;

  const products = await getProductsByCategory({ category });

  return (
    <div>
      <h1 className="text-center text-4xl font-bold capitalize">{category}</h1>

      <main className="mt-5">
        <ProductsContainer products={products} />
      </main>
    </div>
  );
}
