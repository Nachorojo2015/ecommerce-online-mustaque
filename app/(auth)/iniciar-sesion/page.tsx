import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/components/auth/LoginForm";
import LoginGoogleButton from "@/components/auth/LoginGoogleButton";
import LoginFacebookButton from "@/components/auth/LoginFacebookButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-content-center place-items-center gap-2">
      <Image
        src="/logo-mustaque.png"
        alt="logue-store"
        className="object-cover"
        width={100}
        height={100}
      />

      <h1>Iniciar sesión</h1>

      <LoginGoogleButton />

      <LoginFacebookButton />

      <LoginForm />

      <Link href={"/registro"} className="link">
        ¿No tienes cuenta? Registrate
      </Link>
    </div>
  );
}
