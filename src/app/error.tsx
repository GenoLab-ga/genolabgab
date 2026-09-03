"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-900 mb-4">Erreur</h1>
      <p className="text-xl text-slate-600 mb-4">
        Une erreur s'est produite
      </p>
      <p className="text-slate-500 mb-8 max-w-md">
        Nous rencontrons un problème technique. Veuillez réessayer dans quelques instants.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
