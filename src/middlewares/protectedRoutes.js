import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get token from cookies

  // 🔹 If trying to access a protected route without a token, redirect to login
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow request if authenticated
}

// 🔹 Apply middleware only to specific routes
export const config = {
  matcher: ["/dashboard"],
};
