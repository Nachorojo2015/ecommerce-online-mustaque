import { getProduct } from "@/actions/products/get-product";
import AddProduct from "@/components/cart/AddProduct";
import Image from "next/image";
import { SiMercadopago } from "react-icons/si";

interface Params {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;

  const { ok, message, product } = await getProduct({ slug });

  if (!ok) {
    return <h1>{message}</h1>;
  }

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div>
      <main className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-5 mt-5">
        <div>
          <div className="relative min-h-80 sm:min-h-125">
            <Image
              src={product.images[0]}
              alt="product-image"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>
        <div className="flex flex-col sm:items-start items-center gap-4">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-2xl font-semibold">${product.price}</p>

          <div className="flex items-center gap-2">
            <SiMercadopago size={24} />
            <p>Paga seguro con mercado pago</p>
          </div>

          <AddProduct id={product.id} title={product.title} image={product.images[0]} price={product.price} sizes={product.sizes} />
        </div>
      </main>
    </div>
  );
}
