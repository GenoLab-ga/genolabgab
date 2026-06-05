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
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
