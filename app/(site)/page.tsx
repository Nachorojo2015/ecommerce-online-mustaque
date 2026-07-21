import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";

import SliderDesktop from "@/components/ui/SliderDesktop";
import SliderMobile from "@/components/ui/SliderMobile";
import ProductsSlider from "@/components/products/ProductsSlider";

import { getProducts } from "@/actions/products/get-products";

export default async function Home() {
  const products = await getProducts();

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
        <ProductsSlider products={products} />
      </main>
    </div>
  );
}
