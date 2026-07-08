import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GenoLabGab — Keny Karl Mounguele",
    short_name: "GenoLabGab",
    description:
      "Ingénieur Bioinformaticien — Génomique computationnelle, bioinformatique structurale, vaccinomique.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10b981",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
