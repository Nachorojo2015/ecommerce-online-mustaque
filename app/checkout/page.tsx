import AddressForm from "@/components/checkout/AddressForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/iniciar-sesion");
  }

  return (
    <div className="p-3">
      <h1 className="text-center font-bold text-4xl">Checkout</h1>

      <AddressForm />
    </div>
  );
}
