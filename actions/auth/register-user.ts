"use server";

import { auth } from "@/lib/auth";

interface Parameteres {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: Parameteres) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    const err = error as Error;
    console.error(error);

    return {
      ok: false,
      message: err.message,
    };
  }
};
