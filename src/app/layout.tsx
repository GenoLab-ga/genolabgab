import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://genolabgab.vercel.app"),
  title: {
    default: "Keny Karl Mounguele — Ingénieur Bioinformaticien · GenoLabGab",
    template: "%s · GenoLabGab",
  },
  description:
    "Site personnel de Keny Karl Mounguele — ingénieur bioinformaticien à Fès, Maroc. Génomique computationnelle, bioinformatique structurale, docking moléculaire, GenoLabGab.",
  keywords: [
    "génomique",
    "bioinformatique",
    "Gabon",
    "Afrique centrale",
    "recherche scientifique",
    "pharmacogénomique",
    "paludisme",
    "GenoLabGab",
    "Keny Karl Mounguele",
    "NGS",
    "docking moléculaire",
    "vaccinomique",
    "AlphaFold",
    "AutoDock Vina",
  ],
  authors: [{ name: "Keny Karl Mounguele" }],
  creator: "Keny Karl Mounguele",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://genolabgab.vercel.app",
    siteName: "GenoLabGab",
    title: "Keny Karl Mounguele — Ingénieur Bioinformaticien · GenoLabGab",
    description:
      "Génomique computationnelle, bioinformatique structurale, docking moléculaire, vaccinomique.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GenoLabGab — Keny Karl Mounguele",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keny Karl Mounguele — Ingénieur Bioinformaticien · GenoLabGab",
    description:
      "Génomique computationnelle, bioinformatique structurale, docking moléculaire, vaccinomique.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KSPKVmdz3wUSa4N-qu8TSSxnZDPKPSg071ICnfFU3-g",
    other: {
      "msvalidate.01": "4E4CEC3F26BDCEB4B1E0DF8227477927",
    },
  },
  alternates: {
    canonical: "https://genolabgab.vercel.app",
    languages: {
      fr: "https://genolabgab.vercel.app",
      en: "https://genolabgab.vercel.app",
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
