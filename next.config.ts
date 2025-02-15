import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // Use `true` for a 301 redirect, `false` for a 302
      },
    ];
  },
};

export default nextConfig;
