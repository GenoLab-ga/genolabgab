"use client";

import { useEffect, useState } from "react";

const COMMAND = "snakemake --profile genolabgab";

const OUTPUT: { text: string; done?: boolean }[] = [
    { text: "[qc]       FastQC ................ ✓ Q30: 94.2%" },
{ text: "[align]    BWA-MEM ............... ✓ 99.1% mapped" },
{ text: "[variants] GATK HaplotypeCaller .. ✓ 1 204 SNPs" },
{ text: "[annotate] SnpEff ................ ✓ 312 variants" },
{ text: "[done]     Pipeline completed in 3m12s ✓", done: true },
];

export default function Terminal() {
    const [typed, setTyped] = useState(0);
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        if (typed < COMMAND.length) {
            const id = setTimeout(() => setTyped((t) => t + 1), 35);
            return () => clearTimeout(id);
        }
        if (visible < OUTPUT.length) {
            const id = setTimeout(() => setVisible((v) => v + 1), 500);
            return () => clearTimeout(id);
        }
    }, [typed, visible]);

    return (
        <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-[#0b1220] shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 bg-[#111a2e] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-slate-400">
        karl@genolab: ~/pipeline
        </span>
        </div>

        <div className="w-full px-5 py-3 text-center font-mono text-sm leading-6 text-slate-200">
        <p>
        <span className="text-emerald-400">karl@genolab</span>
        <span className="text-slate-500">:</span>
        <span className="text-sky-400">~/pipeline</span>
        <span className="text-slate-500">$ </span>
        <span>{COMMAND.slice(0, typed)}</span>
        {typed < COMMAND.length && (
            <span className="animate-pulse text-emerald-400">▋</span>
        )}
        </p>

        {typed >= COMMAND.length && (
            <>
            {OUTPUT.slice(0, visible).map((line) => (
                <p
                key={line.text}
                className={line.done ? "text-emerald-400" : "text-slate-300"}
                >
                {line.text}
                </p>
            ))}
            {visible >= OUTPUT.length && (
                <p>
                <span className="text-emerald-400">karl@genolab</span>
                <span className="text-slate-500">:</span>
                <span className="text-sky-400">~/pipeline</span>
                <span className="text-slate-500">$ </span>
                <span className="animate-pulse text-emerald-400">▋</span>
                </p>
            )}
            </>
        )}
        </div>
        </div>
    );
}
