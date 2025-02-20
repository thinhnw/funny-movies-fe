import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/newsfeed",
        permanent: true, // Use `true` for a 301 redirect, `false` for a 302
      },
    ];
  },
  output: "standalone",
};
export default nextConfig;
