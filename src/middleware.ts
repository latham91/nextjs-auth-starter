import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || 
                      request.nextUrl.pathname.startsWith("/signup");
  const isBlogRoute = request.nextUrl.pathname.startsWith("/blog");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/dashboard/admin");
  const isPublicRoute = request.nextUrl.pathname === "/" || isBlogRoute;

  // Redirect to login if not authenticated and trying to access protected route
  if (!token && !isAuthRoute && !isPublicRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Check for admin-only routes
  if (isAdminRoute && (!token || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to dashboard if authenticated and trying to access auth route
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}; 