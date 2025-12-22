import { CiShoppingCart, CiUser } from "react-icons/ci";
import SidebarMenu from "./SidebarMenu";

const Navbar = () => {
  return (
    <div className="navbar shadow-sm bg-slate-200 rounded-lg flex items-center justify-between z-50 p-2 top-0">
      <div>
        <SidebarMenu />
      </div>
      <div className="flex items-center gap-3">
        <CiShoppingCart className="cursor-pointer" size={30} />

        <CiUser className="cursor-pointer" size={30} />
      </div>
    </div>
  );
};

export default Navbar;
