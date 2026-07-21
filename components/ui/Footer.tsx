import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="mt-12">
      <div className="max-w-7xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center mt-8 space-x-6">
          <BsInstagram />
          <BsTwitter />
          <BsWhatsapp />
        </div>

        <p className="mt-8 text-base leading-6 text-center">
          © {new Date().getFullYear()} Mustaque, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
