"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const SidebarMenu = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const closeSession = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-1" className="drawer-button">
          <RxHamburgerMenu className="cursor-pointer" size={30} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <label htmlFor="my-drawer-1" className="w-fit">
            <IoClose size={30} className="cursor-pointer" />
          </label>

          <li>
            <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
              Inicio
            </label>
          </li>
          <li>
            <details>
              <summary>Productos</summary>
              <ul className="p-2 w-52 z-1">
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Ver todos los productos
                  </label>
                </li>
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Hoodies/Buzos
                  </label>
                </li>
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Remerones
                  </label>
                </li>
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Pantalones
                  </label>
                </li>
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Shorts
                  </label>
                </li>
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Conjuntos
                  </label>
                </li>
                <li>
                  <label htmlFor="my-drawer-1" onClick={() => router.push("/")}>
                    Accesorios
                  </label>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <label htmlFor="my-drawer-1" onClick={() => router.push("/stores")}>
              Stores
            </label>
          </li>
          <li>
            <label htmlFor="my-drawer-1" onClick={() => router.push("/como-comprar")}>
              Cómo comprar
            </label>
          </li>
          <li>
            <label htmlFor="my-drawer-1" onClick={() => router.push("/preguntas-frecuentes")}>
              Preguntas frecuentes
            </label>
          </li>
          <li>
            <label htmlFor="my-drawer-1" onClick={() => router.push("/politica-de-cambios")}>
              Política de cambios
            </label>
          </li>
          {session && (
            <li>
              <label
                htmlFor="my-drawer-1"
                className="text-red-500"
                onClick={closeSession}
              >
                Cerrar sesión
              </label>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
