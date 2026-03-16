import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@bordo/ui", "@bordo/ad-insights"],
};

export default nextConfig;
