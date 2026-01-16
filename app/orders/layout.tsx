import NavbarCheckout from "@/components/checkout/NavbarCheckout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <NavbarCheckout />
      {children}
    </div>
  );
}
