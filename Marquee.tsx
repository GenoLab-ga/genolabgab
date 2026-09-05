// Marquee.tsx
const TOOLS = ["BWA-MEM","GATK","SnpEff","Snakemake","AlphaFold2","AutoDock Vina","PyMOL","ChimeraX","NetMHCpan","IEDB","FastQC","MultiQC"];
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-lab-700 bg-lab-900/50 py-4">
      <div className="marquee flex w-max gap-10">
        {[...TOOLS, ...TOOLS].map((t, i) => (
          <span key={i} className="font-mono text-sm text-slate-500">
            <span className="text-bio-500">◆</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
