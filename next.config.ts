import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

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
};
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}
export default nextConfig;
