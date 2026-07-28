"use client";

import dynamicImport from "next/dynamic";

// Import dynamique avec ssr: false — Chart.js nécessite l'API canvas du navigateur
const QcChart = dynamicImport(() => import("@/components/QcChart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white animate-pulse text-sm text-slate-400">
    Chargement du module de contrôle qualité...
    </div>
  ),
});

export default function QcChartWrapper() {
  return <QcChart />;
}
