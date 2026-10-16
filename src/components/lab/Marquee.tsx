// Bande d'outils : statique, une seule ligne, discrète.
const TOOLS = [
  "BWA-MEM", "GATK", "SnpEff", "Snakemake", "AlphaFold2", "AutoDock Vina",
  "PyMOL", "ChimeraX", "NetMHCpan", "IEDB", "FastQC", "MultiQC",
];

export default function Marquee() {
  return (
    <div className="border-b border-rule bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-2.5 text-xs text-slate-500 sm:px-6 lg:px-8">
        <span className="shrink-0 font-semibold uppercase tracking-[0.14em] text-slate-700">Outils</span>
        <span className="shrink-0 text-slate-300" aria-hidden="true">|</span>
        <ul className="flex shrink-0 items-center gap-x-5 whitespace-nowrap">
          {TOOLS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
