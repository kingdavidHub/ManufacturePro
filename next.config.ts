import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    AUTH_API: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    SALES_API: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    WAREHOUSE_API: `${process.env.NEXT_PUBLIC_API_URL}/warehouses`,
    PRODUCTION_API: `${process.env.NEXT_PUBLIC_API_URL}/production`,
  }
  // async redirects() {
  //   return [
  //     {
  //       source: "/login",
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //     {
  //       source: "/warehouse/:path*",
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //     {
  //       source: "/sales/:path*",
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
