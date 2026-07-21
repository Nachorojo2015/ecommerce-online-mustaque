import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-12">
      <Image
        src="/logo-mustaque.png"
        alt="logue-store"
        className="object-cover mx-auto"
        width={100}
        height={100}
      />
      <div className="max-w-7xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-col flex-wrap md:flex-row justify-around text-center">
          <div className="py-2">
            <Link href="/" className="text-base leading-6">
              {" "}
              INICIO
            </Link>
          </div>
          <div className="py-2">
            <Link href="/stores" className="text-base leading-6">
              {" "}
              STORES
            </Link>
          </div>
          <div className="py-2">
            <Link href="/como-comprar" className="text-base leading-6">
              {" "}
              CÓMO COMPRAR{" "}
            </Link>
          </div>
          <div className="py-2">
            <Link href="/preguntas-frecuentes" className="text-base leading-6">
              PREGUNTAS FRECUENTES
            </Link>
          </div>
          <div className="py-2">
            <Link href="/politica-de-cambios" className="text-base leading-6">
              POLÍTICA DE CAMBIOS
            </Link>
          </div>
        </nav>

        <div className="flex justify-center mt-8 space-x-6">
          <BsInstagram />
          <BsTwitter />
          <BsWhatsapp />
        </div>

        <p className="mt-8 text-base leading-6 text-center">
          © 2023 Mustaque, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
