import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV !== "development"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
