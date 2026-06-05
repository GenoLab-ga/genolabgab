import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force SSG by default — no server-side runtime needed for this portfolio
  output: "standalone",
  images: {
    // Allow external images if needed
    remotePatterns: [],
    // Optimize local images
    formats: ["image/avif", "image/webp"],
    // Allow SVG images
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable strict mode for better React practices
  reactStrictMode: true,
};

export default nextConfig;
