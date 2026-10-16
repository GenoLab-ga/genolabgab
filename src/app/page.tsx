import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublications, type Publication } from "@/lib/get-publications";
import QcChartWrapper from "@/components/QcChartWrapper";
import Hero from "@/components/lab/Hero";
import Marquee from "@/components/lab/Marquee";
import SectionTag from "@/components/lab/SectionTag";

export const metadata: Metadata = {
  title: "Keny Karl Mounguele - Ingénieur Bioinformaticien · GenoLabGab",
  description:
  "Fondateur de GenoLabGab, ingénieur bioinformaticien spécialisé en génomique computationnelle, bioinformatique structurale et vaccinomique. Basé à Libreville, Gabon.",
  keywords: ["Génomique", "Bio-informatique", "Gabon", "DNA", "Analyse de données", "Docking moléculaire", "Biologie computationnelle"],
  alternates: {
    canonical: "https://genolabgab.com",
  },
};

export const lastModified = "2026-07-28";
export const dynamic = "force-static";

/* ─── SVG Icons (inline) ─── */
function DnaIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M9 3.15c.75.15 1.5.37 2.25.66" />
    <path d="M12.75 3.81c.75.45 1.5 1.08 2.25 1.89" />
    <path d="M2 9c6.667 6 13.333 0 20 6" />
    <path d="M9 20.85c.75-.15 1.5-.37 2.25-.66" />
    <path d="M12.75 20.19c.75-.45 1.5-1.08 2.25-1.89" />
    <path d="M2 6c3.33-3 6.67-3 10 0s6.67 3 10 0" />
    <path d="M2 18c3.33 3 6.67 3 10 0s6.67-3 10 0" />
    </svg>
  );
}

function MicroscopeIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14h2" />
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
    <path d="M12 6V3a1 1 0 0 0-1-1H9" />
    </svg>
  );
}

function SyringeIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-4 0v1" />
    <path d="M14 10V4a2 2 0 0 0-4 0v2" />
    <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
    <path d="M18 8a2 2 0 1 0 4 0v8a2 2 0 0 1-4 0h-4a2 2 0 0 1-4 0h-4a2 2 0 0 1-4 0V8a2 2 0 1 0 4 0" />
    <path d="M22 16c0 4-2 6-4 6h-1" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    </svg>
  );
}

export default function HomePage() {
  const recent: Publication[] = getAllPublications().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Keny Karl Mounguele",
    jobTitle: "Ingénieur Bioinformaticien",
    affiliation: {
      "@type": "Organization",
      name: "Diplômé de l'Université Euromed de Fès",
    },
    url: "https://genolabgab.com",
    sameAs: [
      "https://github.com/GenoLab-ga",
      "https://linkedin.com/in/karl-mounguele",
      "https://orcid.org/0009-0006-6706-0069",
    ],
    knowsAbout: ["Bioinformatics", "Computational Genomics", "Molecular Docking", "Vaccinomics", "NGS Analysis"],
    description:
      "Fondateur de GenoLabGab, initiative indépendante en biologie computationnelle. Génomique, bioinformatique structurale, docking moléculaire.",
  };

  const stats = [
    { value: "2+", label: "Années de recherche" },
    { value: "4", label: "Projets actifs" },
    { value: "6", label: "Familles d'outils" },
    { value: "3", label: "Publications" },
  ];

  const expertise = [
    {
      Icon: DnaIcon,
      title: "Génomique computationnelle",
      desc: "Pipelines NGS reproductibles : contrôle qualité, alignement, détection de variants et annotation fonctionnelle.",
      tools: ["BWA-MEM", "GATK", "SnpEff", "Snakemake"],
    },
    {
      Icon: MicroscopeIcon,
      title: "Bioinformatique structurale",
      desc: "Criblage virtuel de composés bioactifs, modélisation 3D avec AlphaFold2 et docking moléculaire sur cibles thérapeutiques.",
      tools: ["AutoDock Vina", "AlphaFold2", "PyMOL", "ChimeraX"],
    },
    {
      Icon: SyringeIcon,
      title: "Vaccinomique",
      desc: "Vaccinomique inverse : prédiction d'épitopes B et T, modélisation structurale et validation par docking immunitaire.",
      tools: ["NetMHCpan", "IEDB", "Pfs48/45", "TBV"],
    },
  ];

  return (
    <div className="bg-lab-950 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero />
      <Marquee />

      {/* ═══ CHIFFRES ═══ */}
      <section aria-label="Chiffres clés" className="border-b border-lab-700">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-lab-700 px-4 sm:px-6 md:grid-cols-4 md:divide-x lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-10 text-center md:py-12">
              <dd className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">{s.value}</dd>
              <dt className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-400">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ═══ EXPERTISE ═══ */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTag index="01" label="expertise" />
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          De la séquence brute à la cible thérapeutique
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
          Trois piliers de pratique, avec des pipelines versionnés et reproductibles.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-lab-700 bg-lab-700 md:grid-cols-3">
          {expertise.map((d) => (
            <article key={d.title} className="group bg-lab-900 p-8 transition-colors duration-200 hover:bg-lab-800">
              <d.Icon className="h-7 w-7 text-bio-400" />
              <h3 className="mt-6 text-lg font-semibold text-white">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{d.desc}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {d.tools.map((t) => (
                  <li key={t} className="rounded border border-lab-700 px-2 py-1 font-mono text-xs text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PIPELINE / QC ═══ */}
      <section className="border-y border-lab-700 bg-lab-900/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <SectionTag index="02" label="pipeline" />
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Contrôle qualité NGS</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
              Aperçu interactif de l&apos;évaluation de la qualité des données brutes de séquençage. Les scores Phred
              conditionnent la fiabilité de chaque analyse en aval.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Q ≥ 30 · excellente</li>
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Q ≥ 20 · acceptable</li>
            </ul>
          </div>
          <div className="min-w-0 md:w-[420px]">
            <div className="rounded-xl border border-lab-700 bg-white p-6">
              <QcChartWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PUBLICATIONS ═══ */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTag index="03" label="publications" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Articles récents</h2>
          <Link
            href="/publications"
            className="group inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-mono text-sm text-bio-400 transition-colors hover:text-bio-300"
          >
            Toutes les publications
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {recent.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-xl border border-lab-700 bg-lab-900 p-6 transition-colors duration-200 hover:border-bio-500/50"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="rounded border border-bio-500/30 px-2 py-0.5 text-bio-300">{p.categoryLabel.fr}</span>
                <span className="text-slate-400">{p.year}</span>
              </div>
              <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-white">{p.title.fr}</h3>
              <p className="mt-2 font-mono text-xs text-slate-400">{p.journal}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{p.abstract.fr}</p>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex min-h-11 cursor-pointer items-center gap-1.5 pt-5 text-sm font-medium text-bio-400 transition-colors hover:text-bio-300"
                >
                  Lire l&apos;article
                  <ExternalLinkIcon />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-lab-700 bg-lab-900/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Une collaboration en vue ?</h2>
            <p className="mt-2 text-slate-400">Projet de recherche, stage ou discussion scientifique.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-bio-500 px-6 text-sm font-semibold text-lab-950 transition-colors hover:bg-bio-400"
            >
              Me contacter
            </Link>
            <Link
              href="/cv"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-lab-700 px-6 font-mono text-sm text-slate-200 transition-colors hover:border-bio-400"
            >
              Voir mon CV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
