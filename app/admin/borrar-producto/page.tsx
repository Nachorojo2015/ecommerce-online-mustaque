import Image from "next/image";
import { getProducts } from "@/actions/products/get-products";
import { currencyFormat } from "@/utils/currency-format";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import Logo from "@/components/ui/Logo";

export default async function BorrarProductoPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <Logo />

      <h1 className="text-3xl font-bold mb-8">Borrar producto</h1>

      {products.length === 0 ? (
        <p className="text-center font-bold">No hay productos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col rounded-sm shadow">
              <div className="relative min-w-72 min-h-96">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-col items-center gap-2 p-2">
                <p className="font-bold text-center">{product.title}</p>
                <p>{currencyFormat(product.price)}</p>

                <DeleteProductButton
                  productId={product.id}
                  productTitle={product.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
