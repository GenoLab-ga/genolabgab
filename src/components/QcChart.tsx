"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Enregistrement des composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function QcChart() {
  // Simulation de données FastQC (Phred Score le long de la lecture)
  const data = {
    labels: Array.from({ length: 35 }, (_, i) => `${i + 1}`), // Positions 1 à 35
    datasets: [
      {
        label: "Phred Score Moyen (Q)",
        data: [32, 34, 35, 35, 36, 36, 37, 37, 38, 38, 37, 36, 36, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 29, 28, 28, 27, 26, 25, 25, 24, 23, 22, 22],
        borderColor: "#059669", // Vert émeraude
        backgroundColor: "rgba(5, 150, 105, 0.1)",
        borderWidth: 3,
        tension: 0.3, // Courbe lissée
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 40,
        title: { display: true, text: "Phred Score (Q)", font: { weight: "bold" as const } },
        grid: { color: "rgba(200, 200, 200, 0.15)" },
      },
      x: {
        title: { display: true, text: "Position dans la lecture (bp)", font: { weight: "bold" as const } },
        grid: { display: false },
      },
    },
  };

  return (
    <>
    <div className="mb-4 text-left">
    <h3 className="text-lg font-semibold text-slate-900">
    Contrôle Qualité des Lectures (Simulé)
    </h3>
    <p className="text-xs text-slate-500">
    Distribution des scores de qualité Phred par position de nucléotide.
    </p>
    </div>
    <Line data={data} options={options} />
    <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs font-medium">
    <span className="flex items-center gap-1.5 text-emerald-600">
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
    Zone Verte (Q ≥ 30) : Excellente qualité
    </span>
    <span className="flex items-center gap-1.5 text-amber-500">
    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
    Zone Orange (20 ≤ Q &lt; 30) : Acceptable
    </span>
    </div>
    </>
  );
}
