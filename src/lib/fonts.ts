import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

export const fontDisplay = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
export const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const fontMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-ibm-plex-mono", display: "swap", weight: ["400", "500", "600"] });
