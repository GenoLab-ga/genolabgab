import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optionnel : Si tu veux un export 100% statique (HTML/CSS/JS) sans aucun serveur Node,
  // remplace "standalone" par "export". Mais "standalone" fonctionne très bien sur Vercel.
  output: "standalone",

  images: {
    // Formats modernes pour réduire drastiquement le poids de tes images de séquençage/profil
    formats: ["image/avif", "image/webp"],

    // Indispensable pour ton fichier /images/avatar.svg
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",

    // Ajustement de la CSP pour s'assurer que les styles inline de tes SVGs (couleurs, gradients) fonctionnent
    contentSecurityPolicy: "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'none'; sandbox;",

    // Si tu prévois d'afficher des images provenant d'outils externes (ex: GitHub, ORCID, Unsplash)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      }
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
