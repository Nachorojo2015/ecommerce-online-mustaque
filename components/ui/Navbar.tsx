import { CiShoppingCart, CiUser } from "react-icons/ci";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="navbar fixed left-0 top-3 mx-3 w-[calc(100%-24px)] shadow-sm bg-base-100 rounded-lg flex items-center justify-between z-50 p-2">
      <div>
        <SidebarMenu />
      </div>
      <div className="flex items-center gap-3">
        <CiShoppingCart className="cursor-pointer" size={30} />

        {session ? (
          <Image
            src={session.user.image ?? "/user-default.png"}
            alt="user-image"
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        ) : (
          <Link href={"/iniciar-sesion"}>
            <CiUser className="cursor-pointer" size={30} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
