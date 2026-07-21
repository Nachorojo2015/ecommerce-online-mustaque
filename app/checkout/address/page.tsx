import AddressForm from "@/components/checkout/AddressForm";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function CheckoutAddressPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <Link href="/" className="btn btn-ghost btn-sm gap-1 -ml-2 mb-2">
        <IoArrowBack size={18} />
        Volver a la tienda
      </Link>

      <h1 className="text-center font-bold text-3xl sm:text-4xl">
        Datos para el envío
      </h1>

      <AddressForm />
    </div>
  );
}
