import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPublications, type Publication } from "@/lib/get-publications";
import QcChartWrapper from "@/components/QcChartWrapper";

export const metadata: Metadata = {
  title: "Keny Karl Mounguele - Ingénieur Bioinformaticien · GenoLabGab",
  description:
  "Fondateur de GenoLabGab, ingénieur bioinformaticien spécialisé en génomique computationnelle, bioinformatique structurale et vaccinomique. Basé à Fès, Maroc.",
  keywords: ["Génomique", "Bio-informatique", "Gabon", "DNA", "Analyse de données"],
  alternates: {
    canonical: "https://genolabgab.vercel.app",
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

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

/* ─── Decorative DNA Helix SVG ─── */
function DnaHelixDecor() {
  return (
    <svg
    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] hidden lg:block"
    width="600"
    height="600"
    viewBox="0 0 200 200"
    fill="none"
    aria-hidden="true"
    >
    <path d="M60 10 Q100 50, 140 50 Q100 90, 60 90 Q100 130, 140 130 Q100 170, 60 170 Q100 190, 120 190" stroke="#10b981" strokeWidth="2" fill="none" />
    <path d="M140 10 Q100 50, 60 50 Q100 90, 140 90 Q100 130, 60 130 Q100 170, 140 170 Q100 190, 80 190" stroke="#06b6d4" strokeWidth="2" fill="none" />
    {[50, 90, 130, 170].map((y) => (
      <line key={y} x1="60" y1={y} x2="140" y2={y} stroke="#10b981" strokeWidth="0.5" opacity="0.5" />
    ))}
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

    {/* ═══ HERO ═══ */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a0f1a]">
    <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#071215]" />
    <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[120px]" />
    <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
    <div className="absolute inset-0 grid-pattern opacity-40" />
    <div className="absolute inset-0 dot-pattern opacity-20" />
    </div>

    <DnaHelixDecor />

    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:gap-16 lg:px-8">
    <div className="animate-fade-up">
    <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 backdrop-blur-sm">
    <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
    Disponible pour collaboration
    </div>

    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
    Bonjour, je suis
    </p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
    <span className="text-white">Keny Karl</span>
    <br />
    <span className="text-gradient-emerald">Mounguele</span>
    </h1>
    <p className="mt-4 text-lg font-medium text-emerald-400 sm:text-xl">
    Ingénieur Bioinformaticien
    </p>
    <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-400">
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
    </svg>
    Diplômé de l&apos;Université Euromed de Fès · Fès, Maroc
    </p>
    <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
    Fondateur de <span className="font-semibold text-emerald-400">GenoLabGab</span>, une initiative
    indépendante en biologie computationnelle. Je développe des pipelines automatisés pour
    l&apos;analyse NGS, le criblage virtuel de composés bioactifs, et la conception de vaccins par vaccinomique.
    </p>

    <div className="mt-10 flex flex-wrap gap-4">
    <Link
    href="/research"
    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:brightness-110"
    >
    Mes recherches
    <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
    </Link>
    <Link
    href="/contact"
    className="inline-flex items-center gap-2 rounded-xl border border-slate-600/50 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10 hover:text-white"
    >
    <MailIcon className="h-4 w-4" />
    Me contacter
    </Link>
    </div>
    </div>

    <div className="relative mx-auto md:mx-0 animate-fade-up animation-delay-300">
    <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-500/10 to-transparent blur-2xl" />
    <div className="absolute -inset-3 rounded-full border-2 border-dashed border-emerald-500/20 animate-rotate-slow" />
    <div className="absolute -inset-1.5 rounded-full border border-emerald-500/10" />
    <div className="relative h-64 w-64 overflow-hidden rounded-full bg-slate-800 sm:h-80 sm:w-80">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10" />
    <Image
    src="/images/avatar.svg"
    alt="Photo de Keny Karl Mounguele - Ingénieur Bioinformaticien"
    fill
    sizes="(max-width: 640px) 256px, 320px"
    className="object-cover p-2"
    priority
    />
    </div>
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 animate-float">
    <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[#0d1525] px-5 py-2 text-sm font-medium text-emerald-400 shadow-xl shadow-black/20 ring-1 ring-emerald-500/20">
    <span className="text-base">🧬</span>
    GenoLabGab
    </div>
    </div>
    <div className="absolute -right-6 top-8 h-3 w-3 rounded-full bg-emerald-400/40 animate-pulse" />
    <div className="absolute -left-4 bottom-20 h-2 w-2 rounded-full bg-cyan-400/30 animate-pulse animation-delay-500" />
    <div className="absolute right-4 -top-4 h-2.5 w-2.5 rounded-full bg-emerald-300/20 animate-float animation-delay-300" />
    </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="flex flex-col items-center gap-2">
    <span className="text-xs font-medium tracking-wider text-slate-500 uppercase">Découvrir</span>
    <svg className="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
    </svg>
    </div>
    </div>
    </section>

    {/* ═══ STATS ═══ */}
    <section className="relative -mt-1 bg-white" aria-label="Statistiques">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className="relative -mt-12 rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-10">
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
    {[
      { value: "2+", label: "Années de recherche", icon: "🔬" },
      { value: "4", label: "Projets actifs", icon: "🧬" },
      { value: "6", label: "Catégories d'outils", icon: "🛠️" },
      { value: "3", label: "Publications", icon: "📄" },
    ].map((stat, i) => (
      <div
      key={stat.label}
      className={`animate-count-up text-center ${i === 1 ? "animation-delay-100" : ""} ${i === 2 ? "animation-delay-200" : ""} ${i === 3 ? "animation-delay-300" : ""}`}
      >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl">
      {stat.icon}
      </div>
      <div className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{stat.value}</div>
      <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
      </div>
    ))}
    </div>
    </div>
    </div>
    </section>

    {/* ═══ EXPERTISE ═══ */}
    <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">Ce que je fais</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
    Domaines d&apos;expertise
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
    Trois piliers de ma pratique en bioinformatique computationnelle, de la génomique à la vaccinomique.
    </p>
    </div>

    <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {[
      {
        Icon: DnaIcon,
        title: "Génomique computationnelle",
        desc: "Pipelines NGS automatisés pour le contrôle qualité, l'alignement, la détection de variants et l'annotation fonctionnelle. Expertise avec BWA-MEM, GATK, SnpEff et les workflows Snakemake.",
        tools: ["BWA-MEM", "GATK", "SnpEff", "Snakemake"],
        gradient: "from-emerald-500 to-teal-500",
      },
      {
        Icon: MicroscopeIcon,
        title: "Bioinformatique structurale",
        desc: "Criblage virtuel de composés bioactifs contre des cibles thérapeutiques. Modélisation 3D avec AlphaFold2 et ColabFold, docking moléculaire et visualisation avec PyMOL et ChimeraX.",
        tools: ["AutoDock Vina", "AlphaFold2", "PyMOL", "ChimeraX"],
        gradient: "from-cyan-500 to-blue-500",
      },
      {
        Icon: SyringeIcon,
        title: "Vaccinomique",
        desc: "Conception de candidats vaccins par vaccinomique inverse. Prédiction d'épitopes B et T cellulaire avec NetMHCpan et IEDB, modélisation structurale et validation par docking immunitaire.",
        tools: ["NetMHCpan", "IEDB", "Pfs48/45", "TBV"],
        gradient: "from-violet-500 to-purple-500",
      },
    ].map((d, i) => (
      <div
      key={d.title}
      className={`card-hover card-glow gradient-border group rounded-2xl p-7 animate-fade-up ${i === 1 ? "animation-delay-200" : ""} ${i === 2 ? "animation-delay-400" : ""}`}
      >
      <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${d.gradient} p-2.5 text-white shadow-lg`}>
      <d.Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{d.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{d.desc}</p>
      <div className="mt-5 flex flex-wrap gap-2">
      {d.tools.map((tool) => (
        <span
        key={tool}
        className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80 transition group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:ring-emerald-200/80"
        >
        {tool}
        </span>
      ))}
      </div>
      </div>
    ))}
    </div>
    </section>

    {/* ═══ CHART ═══ */}
    <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
    <div>
    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">Pipeline</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
    Contrôle Qualité NGS
    </h2>
    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
    Aperçu interactif des outils d&apos;évaluation de la qualité des données brutes de séquençage générés par nos pipelines bioinformatiques. Les scores Phred garantissent la fiabilité de chaque analyse.
    </p>
    <div className="mt-6 flex items-center gap-4">
    <div className="flex items-center gap-2 text-sm text-slate-600">
    <span className="h-3 w-3 rounded-full bg-emerald-500" />
    Qualité excellente (Q ≥ 30)
    </div>
    <div className="flex items-center gap-2 text-sm text-slate-600">
    <span className="h-3 w-3 rounded-full bg-amber-400" />
    Qualité acceptable (Q ≥ 20)
    </div>
    </div>
    </div>
    <div className="min-w-0 md:w-[420px]">
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
    <QcChartWrapper />
    </div>
    </div>
    </div>
    </section>

    {/* ═══ PUBLICATIONS ═══ */}
    <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">Publications</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
    Articles récents
    </h2>
    </div>
    <Link
    href="/publications"
    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
    >
    Voir tous les articles
    <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
    </Link>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
    {recent.map((p, i) => (
      <article
      key={p.id}
      className={`card-hover group relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200/80 animate-fade-up ${i === 1 ? "animation-delay-200" : ""} ${i === 2 ? "animation-delay-400" : ""}`}
      >
      <div className={`absolute left-0 top-0 h-full w-1 ${p.category === "paper" ? "bg-blue-500" : "bg-emerald-500"}`} />
      <div className="flex items-center justify-between text-xs">
      <span
      className={`rounded-full px-3 py-1 font-semibold ${
        p.category === "paper"
        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200/60"
        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60"
      }`}
      >
      {p.categoryLabel.fr}
      </span>
      <span className="font-medium text-slate-400">{p.year}</span>
      </div>
      <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 transition group-hover:text-emerald-700 line-clamp-3">
      {p.title.fr}
      </h3>
      <p className="mt-2 text-xs font-medium text-slate-400">{p.journal}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">{p.abstract.fr}</p>
      {p.href && (
        <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition group-hover:text-emerald-700"
        >
        Lire l&apos;article
        <ExternalLinkIcon />
        </a>
      )}
      </article>
    ))}
    </div>
    </section>

    {/* ═══ CTA — Bande compacte avec texte défilant ═══ */}
    <section className="mx-auto mt-20 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 py-5 shadow-xl shadow-emerald-900/20">
    <div className="absolute inset-0 dot-pattern opacity-10" />
    <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:px-8">
    <div className="flex w-full overflow-hidden sm:w-auto sm:flex-1 sm:pr-8">
    <div className="animate-marquee flex shrink-0 items-center gap-6 whitespace-nowrap text-white">
    <span className="text-sm font-medium">Intéressé par une collaboration ?</span>
    <span className="h-1 w-1 rounded-full bg-white/40" />
    <span className="text-sm text-emerald-100">Projet de recherche · Stage · Discussion scientifique</span>
    <span className="h-1 w-1 rounded-full bg-white/40" />
    <span className="text-sm font-medium">Intéressé par une collaboration ?</span>
    <span className="h-1 w-1 rounded-full bg-white/40" />
    <span className="text-sm text-emerald-100">Projet de recherche · Stage · Discussion scientifique</span>
    <span className="h-1 w-1 rounded-full bg-white/40" />
    <span className="text-sm font-medium">Intéressé par une collaboration ?</span>
    <span className="h-1 w-1 rounded-full bg-white/40" />
    <span className="text-sm text-emerald-100">Projet de recherche · Stage · Discussion scientifique</span>
    </div>
    </div>
    <div className="flex shrink-0 gap-3">
    <Link
    href="/contact"
    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
    >
    Me contacter
    </Link>
    <Link
    href="/cv"
    className="hidden rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:inline-flex"
    >
    Voir mon CV
    </Link>
    </div>
    </div>
    </div>
    </section>
    </>
  );
}
