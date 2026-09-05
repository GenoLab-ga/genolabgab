"use client";
import { useEffect, useState } from "react";

const CMD = "snakemake --profile genolabgab";
const OUT = [
  "[qc]       FastQC ................ ✓ Q30: 94.2%",
  "[align]    BWA-MEM ............... ✓ 99.1% mapped",
  "[variants] GATK HaplotypeCaller .. ✓ 1 204 SNPs",
  "[annotate] SnpEff ................ ✓ 312 variants",
  "[done]     Pipeline completed in 3m12s",
];

export default function Terminal() {
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(CMD.length); setShown(OUT.length); return;
    }
    if (typed < CMD.length) {
      const t = setTimeout(() => setTyped(typed + 1), 45);
      return () => clearTimeout(t);
    }
    if (shown < OUT.length) {
      const t = setTimeout(() => setShown(shown + 1), 380);
      return () => clearTimeout(t);
    }
  }, [typed, shown]);

  return (
    <div className="rounded-xl border border-lab-700 bg-lab-900/80 shadow-2xl shadow-bio-500/10 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-lab-700 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">karl@genolab: ~/pipeline</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-6">
        <p>
          <span className="text-bio-400">➜</span> <span className="text-slate-500">~</span>{" "}
          <span className="text-slate-200">{CMD.slice(0, typed)}</span>
          {typed < CMD.length && <span className="animate-pulse text-bio-300">▊</span>}
        </p>
        {OUT.slice(0, shown).map((l) => (
          <p key={l} className="text-slate-400">
            {l.split("✓")[0]}
            <span className="text-bio-400">✓</span>
            <span className="text-bio-300">{l.split("✓")[1]}</span>
          </p>
        ))}
        {shown >= OUT.length && (
          <p><span className="text-bio-400">➜</span> <span className="text-slate-500">~</span>{" "}
          <span className="animate-pulse text-bio-300">▊</span></p>
        )}
      </div>
    </div>
  );
}
