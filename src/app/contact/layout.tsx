import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact — Keny Karl Mounguele",
  description:
  "Contactez Keny Karl Mounguele pour des collaborations en bioinformatique, analyses génomiques ou projets de recherche.",
  alternates: {
    canonical: "https://genolabgab.com/contact",
  },
};

export const lastModified = "2026-07-28";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
