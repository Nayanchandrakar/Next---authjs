import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "@/schema/form-schema";
import { getUserByEmail, getUserById } from "@/app/action/data";
import type { UserRole } from "@prisma/client";
import db from "@/lib/db";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = loginFormSchema.safeParse(credentials);

        if (validateFields?.success) {
          const validData = validateFields?.data;

          const user = await getUserByEmail(validData.email);

          if (!user || !user.password) return null;

          const unHashedPassword = await bcrypt?.compare(
            validData.password,
            user.password
          );

          if (unHashedPassword) return user;

          return null;
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  events: {
    async linkAccount({ user }) {
      await db?.user?.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    // async signIn({ user }) {
    //   const isExist = await getUserById(user.id!);

    //   if(!isExist || !isExist.emailVerified){
    //     return false
    //   }

    //   return true;
    // },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token?.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },

    session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
