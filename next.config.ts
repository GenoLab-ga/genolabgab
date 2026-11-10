import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' https://challenges.cloudflare.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

// Redirections 301 pour préserver le SEO lors du passage v1 → v2
const redirects = [
  { source: "/about", destination: "/fr/about", permanent: true },
  { source: "/research", destination: "/fr/reports", permanent: true },
  { source: "/publications", destination: "/fr/reports", permanent: true },
  { source: "/projects", destination: "/fr", permanent: true },
  { source: "/tapclavier", destination: "/fr", permanent: true },
  { source: "/blog", destination: "/fr/reports", permanent: true },
  { source: "/cv", destination: "/fr", permanent: true },
  { source: "/contact", destination: "/fr/contact", permanent: true },
  { source: "/blog/docking-p24-vih", destination: "/fr", permanent: true },
  { source: "/blog/quest-ce-que-la-bioinformatique", destination: "/fr", permanent: true },
  { source: "/blog/resistance-antipaludeenne-plasmodium-ethiopie", destination: "/fr", permanent: true },
  { source: "/blog/sol-mine", destination: "/fr", permanent: true },
  { source: "/blog/surveillance-resistance-mtb-nanopore", destination: "/fr", permanent: true },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return redirects;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
