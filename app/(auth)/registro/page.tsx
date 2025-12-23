import LoginFacebookButton from "@/components/auth/LoginFacebookButton";
import LoginGoogleButton from "@/components/auth/LoginGoogleButton";
import RegisterForm from "@/components/auth/RegisterForm";

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid place-content-center place-items-center gap-2">
      <Image
        src="/logo-mustaque.png"
        alt="logue-store"
        className="object-cover"
        width={100}
        height={100}
      />

      <h1>Registro</h1>

      <LoginGoogleButton />

      <LoginFacebookButton />

      <RegisterForm />

      <Link href={"/iniciar-sesion"} className="link">
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </div>
  );
}
