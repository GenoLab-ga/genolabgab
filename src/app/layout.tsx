import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://genolabgab.com"),
  title: {
    default: "Karl Mounguele - Ingénieur Bioinformaticien · GenoLabGab",
    template: "%s · GenoLabGab",
  },
  description:
    "Site de Karl Mounguele - ingénieur bioinformaticien à Fès, Maroc. Génomique computationnelle, bioinformatique structurale, docking moléculaire, GenoLabGab.",
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
    "RNA-seq",
    "transcriptomique",
    "métagénomique",
    "Nextflow",
    "Snakemake",
    "Python bioinformatique",
    "R bioinformatique",
  ],
  authors: [{ name: "Karl Mounguele", url: "https://genolabgab.com" }],
  creator: "Keny Karl Mounguele",
  publisher: "GenoLabGab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://genolabgab.com",
    siteName: "GenoLabGab",
    title: "Karl Mounguele - Ingénieur Bioinformaticien · GenoLabGab",
    description:
      "Génomique computationnelle, bioinformatique structurale, docking moléculaire, vaccinomique.",
    images: [
      {
        url: "https://genolabgab.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenoLabGab - Keny Karl Mounguele",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karl Mounguele - Ingénieur Bioinformaticien · GenoLabGab",
    description:
      "Génomique computationnelle, bioinformatique structurale, docking moléculaire, vaccinomique.",
    images: ["https://genolabgab.com/og-image.png"],
    creator: "@GenoLabGab",
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
    google: "1XF9YFr5FtdxzRCsgUJeesC9sQ9cbynLDq9WMr03quE",
    google: "4EaVvSnFQucvImZmrzjM5-0oz58oG-5145cmyjxAdpg",
    yandex: "",
    yahoo: "",
    other: {
      "msvalidate.01": "4E4CEC3F26BDCEB4B1E0DF8227477927",
    },
  },
  alternates: {
    canonical: "https://genolabgab.com",
    languages: {
      "fr-FR": "https://genolabgab.com",
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GenoLabGab",
              "url": "https://genolabgab.com",
              "description":
                "Site de Karl Mounguele - ingénieur bioinformaticien. Génomique computationnelle, bioinformatique structurale, docking moléculaire.",
              author: {
                "@type": "Person",
                name: "Keny Karl Mounguele",
                url: "https://genolabgab.com",
                jobTitle: "Ingénieur Bioinformaticien",
                worksFor: {
                  "@type": "Organization",
                  name: "GenoLabGab",
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Fès",
                  addressCountry: "Maroc",
                },
                knowsAbout: [
                  "Bioinformatique",
                  "Génomique",
                  "Transcriptomique",
                  "Docking Moléculaire",
                  "Pharmacogénomique",
                  "NGS",
                  "RNA-seq",
                ],
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://genolabgab.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* ✅ Analytics Vercel */}
        <Analytics />

        {/* ✅ Speed Insights (Core Web Vitals) */}
        <SpeedInsights />
      </body>
    </html>
  );
}
