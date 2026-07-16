import { getProduct } from "@/actions/products/get-product";
import AddProduct from "@/components/cart/AddProduct";
import ProductImages from "@/components/products/ProductImages";
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

  return (
    <div>
      <main className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-5 mt-5">
        <ProductImages images={product.images} />
        <div className="flex flex-col sm:items-start items-center gap-4">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-2xl font-semibold">{currencyFormat(product.price)}</p>

          <div className="flex items-center gap-2">
            <SiMercadopago size={24} />
            <p>Paga seguro con mercado pago</p>
          </div>

          <AddProduct product={product} />
        </div>
      </main>
    </div>
  );
}
