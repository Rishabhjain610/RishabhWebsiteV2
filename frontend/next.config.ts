import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
