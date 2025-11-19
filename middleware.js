// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;

//   const isLoggedIn = Boolean(token);
//   const protectedRoutes = ["/dashboard"];

//   if (!isLoggedIn && protectedRoutes.some(r => pathname.startsWith(r))) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

 
//   if (isLoggedIn && pathname === "/login") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };



import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define protected admin routes
  const adminRoutes = ["/dashboard"];

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 1️⃣ Trying to access admin route but not logged in → redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Logged in but not admin → block & redirect
  if (token && isAdminRoute && token.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3️⃣ Already logged in → don't allow going back to login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // protect ALL dashboard routes
    "/login",            // redirect logged-in users
  ],
};
