import NavbarCheckout from "@/components/checkout/NavbarCheckout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/iniciar-sesion");
  }

  return (
    <div>
      <NavbarCheckout />

      <div className="mt-3">{children}</div>
    </div>
  );
}
