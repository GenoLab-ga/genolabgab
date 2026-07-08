import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],

  images: {
    formats: ["image/avif", "image/webp"],

    // ✅ Désactiver SVG si possible
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
          // Protection clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // Protection MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Referrer Policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // ✅ CORRECTION: Retirer interest-cohort (obsolète)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },

          // HSTS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // ✅ CORRECTION: Autoriser Vercel Analytics
              `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""} https://va.vercel-scripts.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://avatars.githubusercontent.com",
              "font-src 'self'",
              // ✅ CORRECTION: Autoriser Vercel Analytics et Speed Insights
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
