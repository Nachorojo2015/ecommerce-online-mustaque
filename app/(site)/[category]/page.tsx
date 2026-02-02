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

  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function CategoryProductsPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;

  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const { products, total } = await getProductsByCategory({
    category,
    page: currentPage,
    pageSize: 8,
  });

  return (
    <div>
      <h1 className="text-center text-4xl font-bold capitalize">{category}</h1>

      <main className="mt-5">
        <ProductsContainer
          products={products}
          page={currentPage}
          total={total}
          pageSize={8}
          basePath={`/${category}`}
        />
      </main>
    </div>
  );
}
