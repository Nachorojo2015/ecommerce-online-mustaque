import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acdn.mitiendanube.com",
      },
    ],
  },
};

export default nextConfig;
