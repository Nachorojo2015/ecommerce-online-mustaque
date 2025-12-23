"use server";

import { auth } from "@/lib/auth";

interface Parameters {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: Parameters) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    const err = error as Error;

    return {
      ok: false,
      message: err.message,
    };
  }
};
