import AddressForm from "@/components/checkout/AddressForm";

export default function CheckoutAddressPage() {
  return (
    <div className="p-3">
      <h1 className="text-center font-bold text-4xl">Datos para el envío</h1>

      <AddressForm />
    </div>
  );
}
