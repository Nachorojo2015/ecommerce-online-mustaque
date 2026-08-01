import { getProduct } from "@/actions/products/get-product";
import { getProductsByCategory } from "@/actions/products/get-products-by-category";
import AddProduct from "@/components/cart/AddProduct";
import ProductImages from "@/components/products/ProductImages";
import ProductsSlider from "@/components/products/ProductsSlider";
import { currencyFormat } from "@/utils/currency-format";
import { SiMercadopago } from "react-icons/si";

interface Params {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;

  const product = await getProduct({ slug });

  if (!product) {
    return <p className="text-center font-bold">Producto no encontrado</p>;
  }

  const relatedProducts = (
    await getProductsByCategory({ category: product.category })
  ).filter((relatedProduct) => relatedProduct.slug !== product.slug);

  return (
    <div className="mx-auto max-w-5xl">
      <main className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        <ProductImages images={product.images} />

        <div className="flex flex-col items-center gap-4 sm:items-start">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h1 className="text-2xl font-bold sm:text-3xl">{product.title}</h1>
            <p className="text-2xl font-semibold text-primary">
              {currencyFormat(product.price)}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-base-200 px-3 py-2 text-sm">
            <SiMercadopago size={20} />
            <p>Paga seguro con Mercado Pago</p>
          </div>

          <div className="divider my-0 w-full sm:w-full" />

          <AddProduct product={product} />
        </div>
      </main>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center text-3xl font-bold">
            También te puede interesar
          </h2>

          <ProductsSlider products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
