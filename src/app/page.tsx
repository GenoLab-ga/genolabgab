import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublications, type Publication } from "@/lib/get-publications";
import QcChartWrapper from "@/components/QcChartWrapper";
import Hero from "@/components/lab/Hero";
import Marquee from "@/components/lab/Marquee";

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

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>;
}

export default function HomePage() {
  const recent: Publication[] = getAllPublications().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Keny Karl Mounguele",
    jobTitle: "Ingénieur Bioinformaticien",
    affiliation: { "@type": "Organization", name: "Diplômé de l'Université Euromed de Fès" },
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
    { value: "2+", label: "années de recherche" },
    { value: "4", label: "projets actifs" },
    { value: "6", label: "familles d'outils" },
    { value: "3", label: "publications" },
  ];

  const expertise = [
    {
      title: "Génomique computationnelle",
      desc: "Pipelines NGS reproductibles : contrôle qualité, alignement, détection de variants et annotation fonctionnelle.",
      tools: "BWA-MEM · GATK · SnpEff · Snakemake",
    },
    {
      title: "Bioinformatique structurale",
      desc: "Criblage virtuel de composés bioactifs, modélisation 3D avec AlphaFold2 et docking moléculaire sur cibles thérapeutiques.",
      tools: "AutoDock Vina · AlphaFold2 · PyMOL · ChimeraX",
    },
    {
      title: "Vaccinomique",
      desc: "Vaccinomique inverse : prédiction d'épitopes B et T, modélisation structurale et validation par docking immunitaire.",
      tools: "NetMHCpan · IEDB · Pfs48/45",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero />
      <Marquee />

      {/* Chiffres : bande compacte */}
      <section aria-label="Chiffres clés" className="border-b border-rule bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-4 px-4 py-5 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <dd className="font-display text-2xl font-semibold text-navy-900">{s.value}</dd>
              <dt className="text-xs text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Expertise</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">
            De la séquence brute à la cible thérapeutique
          </h2>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {expertise.map((d, i) => (
            <article key={d.title} className="border-t-2 border-navy-700 pt-5">
              <p className="text-xs font-semibold tabular-nums text-slate-400">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-navy-900">{d.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{d.desc}</p>
              <p className="mt-4 text-xs text-slate-500">{d.tools}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contrôle qualité */}
      <section className="border-y border-rule bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <Eyebrow>Pipeline</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">Contrôle qualité NGS</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Évaluation de la qualité des données brutes de séquençage : les scores Phred conditionnent la
              fiabilité de chaque analyse en aval.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Q ≥ 30 · excellente</li>
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Q ≥ 20 · acceptable</li>
            </ul>
          </div>
          <div className="min-w-0 md:w-[420px]">
            <div className="rounded-sm border border-rule bg-white p-5">
              <QcChartWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Publications</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">Articles récents</h2>
          </div>
          <Link
            href="/publications"
            className="group inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-navy-900"
          >
            Toutes les publications
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-rule border-y border-rule">
          {recent.map((p) => (
            <li key={p.id} className="grid gap-2 py-6 md:grid-cols-[80px_1fr_auto] md:gap-8">
              <p className="text-sm tabular-nums text-slate-500">{p.year}</p>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-navy-900">{p.title.fr}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {p.categoryLabel.fr} · {p.journal}
                </p>
                <p className="mt-3 line-clamp-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">{p.abstract.fr}</p>
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 self-start text-sm font-semibold text-navy-700 transition-colors hover:text-navy-900"
                >
                  Lire l&apos;article
                  <ExternalLinkIcon />
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="bg-navy-900">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Collaboration, stage ou projet de recherche ?</h2>
            <p className="mt-2 text-slate-300">Je réponds aux propositions de collaboration scientifique.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-md bg-white px-6 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-100"
            >
              Me contacter
            </Link>
            <Link
              href="/cv"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-md border border-navy-600 px-6 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Voir mon CV
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
