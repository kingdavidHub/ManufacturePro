import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RoleProps } from "./types";

export function middleware(request: NextRequest) {
  // Get token and role from cookies
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value as RoleProps | undefined;
  const path = request.nextUrl.pathname;

  // Check if user is trying to access login page
  if (path === "/login") {
    // Only redirect if both token AND role exist
    if (token && role) {
      if (role === "PRODUCTION_MANAGER") {
        return NextResponse.redirect(
          new URL("/production/dashboard", request.url)
        );
      }

      if (role === "SALES_REP") {
        return NextResponse.redirect(new URL("/sales/dashboard", request.url));
      }

      if (role === "WAREHOUSE_MANAGER") {
        return NextResponse.redirect(
          new URL("/warehouse/dashboard", request.url)
        );
      }
    }
    return NextResponse.next();
  }

  // For all other protected routes
  // Redirect to login if token doesn't exist OR role doesn't exist
  if (!token || !role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect dashboard routes with role-specific access
  if (path.includes("/dashboard")) {
    // Prevent SALES_REP from accessing production dashboard
    if (path.includes("/production") && role !== "PRODUCTION_MANAGER") {
      return NextResponse.redirect(new URL("/sales/dashboard", request.url));
    }

    // Prevent WAREHOUSE_MANAGER from accessing sales dashboard
    if (path.includes("/sales") && role !== "SALES_REP") {
      return NextResponse.redirect(
        new URL("/warehouse/dashboard", request.url)
      );
    }

    // Prevent PRODUCTION_MANAGER and SALES_REP from accessing warehouse dashboard
    if (path.includes("/warehouse") && role !== "WAREHOUSE_MANAGER") {
      return NextResponse.redirect(
        new URL(
          `/${
            role === "PRODUCTION_MANAGER" ? "production" : "sales"
          }/dashboard`,
          request.url
        )
      );
    }
  }

  // Also protect other routes under these paths
  if (path.includes("/warehouse") && role !== "WAREHOUSE_MANAGER") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.includes("/sales") && role !== "SALES_REP") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.includes("/production") && role !== "PRODUCTION_MANAGER") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/warehouse/:path*",
    "/sales/:path*",
    "/production/:path*",
  ],
};
