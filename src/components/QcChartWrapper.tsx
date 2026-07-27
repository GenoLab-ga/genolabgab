"use client";

import dynamicImport from "next/dynamic";

// L'import dynamique avec ssr: false est parfaitement légal ici car le fichier est marqué "use client"
const QcChart = dynamicImport(() => import("@/components/QcChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 animate-pulse flex items-center justify-center text-sm text-slate-400">
      Chargement du module de contrôle qualité...
    </div>
  ),
});

export default function QcChartWrapper() {
  return <QcChart />;
}
