import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authCheck(req: NextRequest) {
  const { pathname } = req.nextUrl;

console.log("Middleware authCheck called for path:", pathname);
  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/blog",
  ];


  const isBlogDetail = pathname.startsWith("/blog/");

  if (publicPaths.includes(pathname) || isBlogDetail) {
    return NextResponse.next(); 
  }

  const token = req.cookies.get("accessToken")?.value; 
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
