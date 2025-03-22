import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RoleProps } from "./types";

export function middleware(request: NextRequest) {
  // Get token from cookies instead of localStorage
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value as RoleProps;
  const path = request.nextUrl.pathname;

  // Check if user is trying to access login page
  if (path === "/login") {
    if (token) {
      if (role === "PRODUCTION_MANAGER") {
        return NextResponse.redirect(
          new URL("/production/dashboard", request.url)
        );
      }

      if (role === "SALES_REP") {
        return NextResponse.redirect(new URL("/sales/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (path.includes("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Prevent SALES_REP from accessing warehouse dashboard
    if (path.includes("/production") && role !== "PRODUCTION_MANAGER") {
      return NextResponse.redirect(new URL("/sales/dashboard", request.url));
    }

    // Prevent WAREHOUSE_MANAGER from accessing sales dashboard
    if (path.includes("/sales") && role !== "SALES_REP") {
      return NextResponse.redirect(
        new URL("/warehouse/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/warehouse/:path*", "/sales/:path*"],
};
