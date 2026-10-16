import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";

// Titres : serif éditorial. Corps : Inter. Mono : réservé aux étiquettes et au code.
export const fontDisplay = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", display: "swap", weight: ["500", "600", "700"] });
export const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const fontMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-ibm-plex-mono", display: "swap", weight: ["400", "500"] });
