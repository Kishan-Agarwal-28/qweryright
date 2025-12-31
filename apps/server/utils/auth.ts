import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/utils/db.js";
import { bearer, jwt, oneTap, username } from "better-auth/plugins";
import { env } from "@/env.js";
export const auth = betterAuth({
  experimental: {
    joins: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    jwt(),
    bearer(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 50,
    }),
    oneTap(),
  ],
  emailAndPassword: {
    enabled: true,
  },

  rateLimit: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwe",
      refreshCache: true,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
