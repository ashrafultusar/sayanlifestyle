import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isLoggedIn = Boolean(token);
  const protectedRoutes = ["/dashboard"];

  if (!isLoggedIn && protectedRoutes.some(r => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

 
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
