// Bande d'outils : statique, centrée, discrète.
const TOOLS = [
  "BWA-MEM", "GATK", "SnpEff", "Snakemake", "AlphaFold2", "AutoDock Vina",
  "PyMOL", "ChimeraX", "NetMHCpan", "IEDB", "FastQC", "MultiQC",
];

export default function Marquee() {
  return (
    <div className="border-b border-rule bg-white">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-3 text-xs text-slate-500 sm:px-6">
        {TOOLS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
