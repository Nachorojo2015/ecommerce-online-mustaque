"use client";

import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

const LoginGoogleButton = () => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <button className="btn bg-white text-black w-full border-[#e5e5e5]" onClick={signIn}>
      <FaGoogle />
      Login with Google
    </button>
  );
};

export default LoginGoogleButton;
