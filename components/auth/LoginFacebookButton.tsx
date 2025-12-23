"use client";

import { authClient } from "@/lib/auth-client";
import { FaFacebookF } from "react-icons/fa";

const LoginFacebookButton = () => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "facebook",
    });
  };

  return (
    <button className="btn bg-white text-black w-full border-[#e5e5e5]" onClick={signIn}>
      <FaFacebookF />
      Login with Facebook
    </button>
  );
};

export default LoginFacebookButton;
