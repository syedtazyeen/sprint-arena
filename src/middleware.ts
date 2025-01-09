import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const restrictedPaths = ["/login", "/register"];
  const currentPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(req.cookies.get("next-auth.session-token"));

  if (isAuthenticated && restrictedPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
