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
  Filler
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
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        min: 0,
        max: 40,
        title: { display: true, text: "Phred Score (Q)", font: { weight: "bold" as const } },
        grid: { color: "rgba(200, 200, 200, 0.1)" }
      },
      x: {
        title: { display: true, text: "Position dans la lecture (bp)", font: { weight: "bold" as const } },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
      <div className="mb-4 text-left">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Contrôle Qualité des Lectures (Simulé)</h3>
        <p className="text-xs text-zinc-500">Distribution des scores de qualité Phred par position de nucléotide.</p>
      </div>
      <Line data={data} options={options} />
      <div className="mt-4 flex gap-4 text-xs font-medium justify-center">
        <span className="flex items-center gap-1 text-emerald-600">● Zone Verte (Q ≥ 30) : Excellente qualité</span>
        <span className="flex items-center gap-1 text-amber-500">● Zone Orange (20 ≤ Q &lt; 30) : Acceptable</span>
      </div>
    </div>
  );
}
