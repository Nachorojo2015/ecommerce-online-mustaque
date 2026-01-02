import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NavbarCheckout = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/iniciar-sesion");
  }

  return (
    <nav className="navbar shadow-sm bg-base-100 flex items-center justify-between z-50">
      <Link href={'/'}>
        <Image
          src={"/logo-mustaque.png"}
          alt="logo-mustaqe"
          width={100}
          height={100}
        />
      </Link>

      <Image
        src={session.user.image ?? "/user-default.png"}
        alt="user-image"
        width={40}
        height={40}
        className="object-cover rounded-full"
      />
    </nav>
  );
};

export default NavbarCheckout;
