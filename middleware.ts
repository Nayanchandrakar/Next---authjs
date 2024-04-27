import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  authRoutes,
  apiAuthPrefix,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isLoggedIn = !!req.auth;
  const isAuthPrefixUrl = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes?.includes(pathname);
  const isPublicRoute = publicRoutes?.includes(pathname);

  if (isAuthPrefixUrl) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
