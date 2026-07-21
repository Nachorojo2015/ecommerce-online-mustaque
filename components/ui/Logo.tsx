import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo-mustaque.png"
        alt="logo-mustaque"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
