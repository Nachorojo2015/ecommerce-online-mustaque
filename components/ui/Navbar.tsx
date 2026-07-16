import { CiUser } from "react-icons/ci";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import CartMenu from "../cart/CartMenu";

const Navbar = async () => {
  return (
    <div className="navbar fixed left-0 top-3 mx-3 w-[calc(100%-24px)] shadow-sm bg-base-100 rounded-lg flex items-center justify-between z-50 p-2">
      <div>
        <SidebarMenu />
      </div>
      <div className="flex items-center gap-3">
        <CartMenu />

        <Link href={"/iniciar-sesion"}>
          <CiUser className="cursor-pointer" size={30} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
