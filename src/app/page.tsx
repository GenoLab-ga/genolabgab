import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { publications } from "@/data/site";
// On importe notre nouveau wrapper à la place de l'import dynamique direct
import QcChartWrapper from "@/components/QcChartWrapper";

export const metadata: Metadata = {
  title: "Keny Karl Mounguele — Ingénieur Bioinformaticien · GenoLabGab",
  description:
    "Fondateur de GenoLabGab, ingénieur bioinformaticien spécialisé en génomique computationnelle, bioinformatique structurale et vaccinomique. Basé à Fès, Maroc.",
  keywords: ["Génomique", "Bio-informatique", "Gabon", "DNA", "Analyse de données"],
  alternates: {
    // Remplace par ton sous-domaine exact Vercel
    canonical: "https://genolabgab.vercel.app",
  },
};

// This page is statically generated at build time (SSG)
export const dynamic = "force-static";

export default function HomePage() {
  const recent = [...publications].sort((a, b) => b.year - a.year).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Keny Karl Mounguele",
    jobTitle: "Ingénieur Bioinformaticien",
    affiliation: {
      "@type": "Organization",
      name: "Université Euromed de Fès",
    },
    url: "https://genolabgab.vercel.app",
    sameAs: [
      "https://github.com/GenoLab-ga",
      "https://linkedin.com/in/karl-mounguele",
      "https://orcid.org/0009-0006-6706-0069",
    ],
    knowsAbout: [
      "Bioinformatics",
      "Computational Genomics",
      "Molecular Docking",
      "Vaccinomics",
      "NGS Analysis",
    ],
    description:
      "Fondateur de GenoLabGab, initiative indépendante en biologie computationnelle. Génomique, bioinformatique structurale, docking moléculaire.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #10b981 0, transparent 40%), radial-gradient(circle at 80% 60%, #0ea5e9 0, transparent 40%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:gap-16 md:py-24 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Disponible pour collaboration
            </div>
            <p className="mt-5 text-sm font-medium uppercase tracking-widest text-slate-500">
              Bonjour, je suis
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Keny Karl Mounguele
            </h1>
            <p className="mt-3 text-xl font-medium text-emerald-700">
              Ingénieur Bioinformaticien
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Université Euromed de Fès · Fès, Maroc
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Fondateur de <strong>GenoLabGab</strong>, une initiative indépendante en biologie
              computationnelle. Je développe des pipelines automatisés pour l'analyse NGS, le
              criblage virtuel de composés bioactifs, et la conception de vaccins par vaccinomique.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Mes recherches
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Me contacter
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative mx-auto md:mx-0">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-emerald-200 to-teal-300 opacity-50 blur-2xl" />
            <div className="relative h-56 w-56 overflow-hidden rounded-full bg-slate-100 ring-4 ring-white shadow-2xl sm:h-72 sm:w-72">
              <Image
                src="/images/avatar.svg"
                alt="Photo de Keny Karl Mounguele — Ingénieur Bioinformaticien"
                fill
                sizes="(max-width: 640px) 224px, 288px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-md ring-1 ring-slate-200">
              🧬 GenoLabGab · Fès
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="Statistiques">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4">
          {[
            { k: "2+", v: "Années de recherche" },
            { k: "4", v: "Projets actifs" },
            { k: "6", v: "Catégories d'outils" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-2xl font-bold text-slate-900 sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-slate-500">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOMAINES ─────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Domaines d'expertise
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: "🧬",
              title: "Génomique computationnelle",
              desc: "Pipelines NGS, détection de variants, annotation fonctionnelle (BWA-MEM, GATK, SnpEff).",
            },
            {
              icon: "🔬",
              title: "Bioinformatique structurale",
              desc: "Docking moléculaire, modélisation AlphaFold2, criblage virtuel avec AutoDock Vina.",
            },
            {
              icon: "💉",
              title: "Vaccinomique",
              desc: "Conception de vaccins par vaccinomique inverse, prédiction d'épitopes (NetMHCpan, IEDB).",
            },
          ].map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="text-3xl">{d.icon}</div>
              <h3 className="mt-3 font-semibold text-slate-900">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMO DU LABORATOIRE INTERACTIF ──────── */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Visualisation de données de recherche
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Aperçu interactif des outils d'évaluation de la qualité des données brutes de séquençage générés par nos pipelines bioinformatiques.
        </p>
        <div className="mt-8 max-w-3xl">
          {/* Utilisation propre du composant isolé */}
          <QcChartWrapper />
        </div>
      </section>

      {/* ── PUBLICATIONS RÉCENTES ─────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Articles récents
          </h2>
          <Link
            href="/publications"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Voir tous les articles →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {recent.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
                  {p.categoryLabel.fr}
                </span>
                <span className="text-slate-500">{p.year}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900 group-hover:text-emerald-700 line-clamp-3">
                {p.title.fr}
              </h3>
              <p className="mt-2 text-xs text-slate-500">{p.journal}</p>
              <p className="mt-3 line-clamp-3 text-sm text-slate-600">{p.abstract.fr}</p>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Lire l'article →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white shadow-xl sm:p-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Intéressé par une collaboration ?
          </h2>
          <p className="mt-3 max-w-2xl text-emerald-100">
            Que ce soit pour un projet de recherche, un stage, ou une discussion scientifique, je
            suis ouvert aux échanges.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Me contacter
            </Link>
            <Link
              href="/cv"
              className="rounded-xl border border-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Voir mon CV
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
