import NavbarCheckout from "@/components/checkout/NavbarCheckout";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <NavbarCheckout />
      
      <div className="mt-3">{children}</div>
    </div>
  );
}
