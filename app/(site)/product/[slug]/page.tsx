import { getProduct } from "@/actions/products/get-product";
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

          <select defaultValue="Selecciona un talle" className="select">
            <option disabled={true}>Selecciona un talle</option>
            {product.sizes.map(
              (size: { size: string; stock: number }, index: number) => (
                <option key={index} disabled={size.stock <= 0}>
                  {size.size}
                </option>
              )
            )}
          </select>

          <div>
            <p>Cantidad</p>
            <div className="flex items-center gap-2">
              <button className="btn">+</button>
              <span>1</span>
              <button className="btn">-</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SiMercadopago size={24} />
            <p>Paga seguro con mercado pago</p>
          </div>

          <button className="btn btn-neutral sm:w-fit w-full">Agregar al carrito</button>
        </div>
      </main>
    </div>
  );
}
