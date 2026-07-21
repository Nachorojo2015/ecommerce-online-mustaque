import Image from "next/image";

import LoginForm from "@/components/auth/LoginForm";

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

      <LoginForm />
    </div>
  );
}
