// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from /auth
  if (pathname.startsWith("/auth")) {
    const token = req.cookies.get("sb:token")?.value; // Supabase sets 'sb:token' cookie by default
    if (token) {
      url.pathname = "/account";
      return NextResponse.redirect(url);
    }
  }

  // **Do NOT protect /account here**
  // Any access control for /account is handled within the page itself

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"], // Apply middleware only to /auth routes
};
