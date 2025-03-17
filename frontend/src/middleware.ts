import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("isAuth");

  // If the user is authenticated, allow access
  if (authCookie?.value) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to the login page
  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
