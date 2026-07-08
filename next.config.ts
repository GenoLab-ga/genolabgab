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

    // Si vous devez garder SVG, gardez la CSP restrictive
    // dangerouslyAllowSVG: true,
    // contentDispositionType: "attachment",
    // contentSecurityPolicy: "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'none'; sandbox;",

    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      // Retirer github.com si vous ne chargez pas d'images depuis github.com
      // { protocol: "https", hostname: "github.com" },
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

          // Permissions Policy
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },

          // HSTS
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""}`,
              "style-src 'self' 'unsafe-inline'", // Nécessaire pour Tailwind
              "img-src 'self' data: https://avatars.githubusercontent.com", // ✅ Ajout de github.com si nécessaire
              "font-src 'self'",
              `connect-src 'self' https://formspree.io${isDev ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "object-src 'none'",
              "upgrade-insecure-requests", // ✅ Force HTTPS
              // "report-uri /api/csp-report", // ✅ Optionnel : recevoir les violations CSP
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
