import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/Blog" || pathname.startsWith("/Blog/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/Blog/, "/blog");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Blog/:path*"],
};
