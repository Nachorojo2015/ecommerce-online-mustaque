import { CiCreditCard1, CiDeliveryTruck, CiInstagram } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";

import Link from "next/link";

import SliderDesktop from "@/components/ui/SliderDesktop";
import SliderMobile from "@/components/ui/SliderMobile";
import ProductsContainer from "@/components/products/ProductsContainer";

import { getProducts } from "@/actions/products/get-products";

interface Products {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
}

export default async function Home() {
  const { ok, products, message } = await getProducts();

  return (
    <div>
      <div className="sm:block hidden">
        <SliderDesktop />
      </div>

      <div className="sm:hidden block">
        <SliderMobile />
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-3 mt-12">
        <div className="flex flex-col items-center">
          <CiDeliveryTruck size={100} />
          <p>Envios a todo el país</p>
        </div>
        <div className="flex flex-col items-center">
          <CiCreditCard1 size={100} />
          <p>Hasta 3 cuotas sin interes</p>
        </div>
        <div className="flex flex-col items-center">
          <RiSecurePaymentLine size={100} />
          <p>Compra de manera segura</p>
        </div>
      </div>

      <h1 className="text-center font-bold text-4xl mt-12">
        Productos destacados
      </h1>

      <main className="mt-5">
        {!ok && <p className="text-center">{message}</p>}

        {products?.length === 0 && <p className="text-center">No hay productos disponibles</p>}

        <ProductsContainer products={products as Products[]} />
      </main>

      <div className="flex flex-col items-center mt-12">
        <div className="flex items-center gap-3">
          <CiInstagram size={50} />
          <p className="text-2xl">Mustaque.arg</p>
        </div>
        <Link
          href={"https://www.instagram.com/mustaqe.arg/?hl=es"}
          target="__BLANCK"
          className="link bg-black px-12 py-2 rounded-full text-white mt-2"
        >
          Seguinos
        </Link>
      </div>

      <div className="text-center mt-12">
        <p className="text-3xl">Mustaqe Indumentaria S.A.</p>
        <p>Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
