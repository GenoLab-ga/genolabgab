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

      {/* Chiffres */}
      <section aria-label="Chiffres clés" className="border-b border-rule bg-white">
        <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-y-3 px-4 py-4 text-center sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-center gap-2">
              <dd className="font-display text-2xl font-semibold text-navy-900">{s.value}</dd>
              <dt className="text-xs text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Expertise</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">
            De la séquence brute à la cible thérapeutique
          </h2>
        </div>
        <div className="mt-8 grid gap-8 text-center md:grid-cols-3">
          {expertise.map((d, i) => (
            <article key={d.title} className="border-t-2 border-navy-700 pt-4">
              <p className="text-xs font-semibold tabular-nums text-slate-400">0{i + 1}</p>
              <h3 className="mt-1 text-xl font-semibold text-navy-900">{d.title}</h3>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-600">{d.desc}</p>
              <p className="mt-3 text-xs text-slate-500">{d.tools}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contrôle qualité */}
      <section className="border-y border-rule bg-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center sm:px-6">
          <Eyebrow>Pipeline</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">Contrôle qualité NGS</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            Évaluation de la qualité des données brutes de séquençage : les scores Phred conditionnent la
            fiabilité de chaque analyse en aval.
          </p>
          <div className="mt-6 w-full max-w-md rounded-sm border border-rule bg-white p-5">
            <QcChartWrapper />
          </div>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-slate-600">
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Q ≥ 30 · excellente</li>
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Q ≥ 20 · acceptable</li>
          </ul>
        </div>
      </section>

      {/* Publications */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <Eyebrow>Publications</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">Articles récents</h2>
        </div>

        <ul className="mt-8 divide-y divide-rule border-y border-rule">
          {recent.map((p) => (
            <li key={p.id} className="py-5 text-center">
              <p className="text-xs tabular-nums text-slate-500">
                {p.year} · {p.categoryLabel.fr} · {p.journal}
              </p>
              <h3 className="mx-auto mt-1.5 max-w-3xl text-lg font-semibold leading-snug text-navy-900">{p.title.fr}</h3>
              <p className="mx-auto mt-2 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">{p.abstract.fr}</p>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-navy-900"
                >
                  Lire l&apos;article
                  <ExternalLinkIcon />
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 text-center">
          <Link
            href="/publications"
            className="group inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-navy-900"
          >
            Toutes les publications
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-navy-900">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-10 text-center sm:px-6">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Collaboration, stage ou projet de recherche ?</h2>
          <p className="mt-2 text-slate-300">Je réponds aux propositions de collaboration scientifique.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
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
