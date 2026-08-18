import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {
    serverActions: {
      // Allows the IDE's local browser-preview proxy (127.0.0.1:<random-port>)
      // to invoke Server Actions during local development.
      allowedOrigins: ["127.0.0.*", "localhost:3000", "127.0.0.1:3000"],
    },
  },
};

export default nextConfig;
