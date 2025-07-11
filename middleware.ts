import { NextRequest, NextResponse } from "next/server";

const publicUrls: Record<string, boolean> = {
  "/": true,
  "/login": true,
  "/create-account": true,
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("tweet");
  const isPublic = publicUrls[pathname];

  if (!cookie && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (cookie && isPublic) {
    return NextResponse.redirect(new URL("/post", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], 
};
