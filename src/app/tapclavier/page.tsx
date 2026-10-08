import type { Metadata } from "next";
import TapClavier from "@/components/TapClavier";

export const metadata: Metadata = {
  title: "TapClavier - Entraînement à la frappe au clavier",
  description:
    "TapClavier : un entraîneur de frappe gratuit pour apprendre à taper vite et sans regarder le clavier AZERTY. Mots, phrases, vocabulaire biologique et séquences ADN.",
  alternates: {
    canonical: "https://genolabgab.com/tapclavier",
  },
};

export const lastModified = "2026-10-02"; // ← à bumper quand tu modifies cette page

export const dynamic = "force-static";

export default function TapClavierPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">TapClavier</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Entraînez-vous à taper sans regarder le clavier.
      </p>
      <TapClavier />
    </div>
  );
}
