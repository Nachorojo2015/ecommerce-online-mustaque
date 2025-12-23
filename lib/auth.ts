import { betterAuth } from "better-auth";
import { pool } from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: pool,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },

  plugins: [nextCookies()],
});
