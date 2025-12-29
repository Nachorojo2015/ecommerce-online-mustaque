import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-3">
      <Navbar />
      <div className="mt-20">{children}</div>
      <Footer />
    </div>
  );
}
