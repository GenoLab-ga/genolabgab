import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  // Force Next.js à utiliser le dossier courant comme racine
  turbopack: {
    root: process.cwd(),
  },

  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],

  images: {
    formats: ["image/avif", "image/webp"],
      dangerouslyAllowSVG: false,
      remotePatterns: [
        { protocol: "https", hostname: "avatars.githubusercontent.com" },
      ],
  },

  reactStrictMode: true,

  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://avatars.githubusercontent.com",
              "font-src 'self'",
              `connect-src 'self' https://formspree.io https://va.vercel-scripts.com https://vitals.vercel-insights.com${isDev ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
