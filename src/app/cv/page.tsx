import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Keny Karl Mounguele, Ingénieur Bioinformaticien",
  description:
    "Curriculum vitae de Keny Karl Mounguele : formation, expériences en recherche, compétences bioinformatiques et publications.",
  alternates: {
    canonical: "https://genolabgab.vercel.app/cv",
  },
};

export const lastModified = "2026-06-05"; // ← à bumper quand tu modifies cette page

export const dynamic = "force-static";

const experience = [
  {
    role: "Fondateur & Chercheur indépendant",
    org: "GenoLabGab",
    location: "Fès, Maroc",
    period: "2023 – présent",
    bullets: [
      "Développement de pipelines bioinformatiques automatisés (Snakemake, Python, Bash) pour l'analyse NGS.",
      "Criblage virtuel de composés naturels par AutoDock Vina contre des cibles thérapeutiques.",
      "Conception d'un candidat vaccin anti-paludéen (TBV Pfs48/45) par vaccinomique inverse.",
      "Publication d'articles et tutoriels scientifiques ouverts sur le blog GenoLabGab.",
    ],
  },
  {
    role: "Stagiaire en Bioinformatique",
    org: "Laboratoire de Biotechnologie — Université Euromed de Fès",
    location: "Fès, Maroc",
    period: "2023 – 2024",
    bullets: [
      "Analyse de la diversité génétique du riz à partir du dataset 3K-RGP (3000 génomes).",
      "Pipeline complet : contrôle qualité (fastp), alignement (BWA-MEM), variant calling (GATK), annotation (SnpEff).",
      "Analyse statistique avec PLINK, VCFtools et R.",
    ],
  },
];

const education = [
  {
    degree: "Master en Biotechnologie & Bioinformatique",
    school: "Université Euromed de Fès",
    location: "Fès, Maroc",
    years: "2022 – 2025",
    highlight: "",
  },
  {
    degree: "Licence 2 en Ingénierie de la Santé",
    school: "Ecole Supérieure d'Ingénierie de la Santé et de Management de Projets",
    location: "Casablanca, Maroc",
    years: "2020 – 2022",
    highlight: "",
  },
];

const skillGroups = [
  {
    title: "Génomique & NGS",
    skills: ["BWA-MEM", "GATK", "Samtools", "bcftools", "fastp", "SnpEff", "Snakemake", "PLINK", "VCFtools"],
  },
  {
    title: "Docking & Modélisation",
    skills: ["AutoDock Vina", "AlphaFold2", "ColabFold", "PyMOL", "ChimeraX", "Discovery Studio", "Maestro"],
  },
  {
    title: "Immunoinformatique",
    skills: ["NetMHCpan", "IEDB", "BepiPred", "VaxiJen", "NetCTL", "ABCpred", "ProtParam"],
  },
  {
    title: "Langages & Dev",
    skills: ["Python", "R", "Bash", "Jupyter", "Git", "Linux", "LaTeX"],
  },
];

const languages = [
  { lang: "Français", level: "Langue maternelle" },
  { lang: "Anglais", level: "Professionnel (B1)" },

];

export default function CVPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Keny Karl Mounguele
          </h1>
          <p className="mt-2 text-lg font-medium text-emerald-700">Ingénieur Bioinformaticien</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>📍 Fès, Maroc</span>
            <a href="k.karlmounguele@gmail.com" className="hover:text-emerald-700">
              ✉️ k.karlmounguele@gmail.com
            </a>
            <a
              href="https://github.com/GenoLab-ga"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-700"
            >
              🔗 GitHub
            </a>
            <a
              href="https://orcid.org/0009-0006-6706-0069"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-700"
            >
              🆔 ORCID
            </a>
          </div>
        </div>
        <a
          href="/cv.pdf"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          download
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
          </svg>
          Télécharger PDF
        </a>
      </div>

      {/* Profil */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6" aria-labelledby="profil-heading">
        <h2 id="profil-heading" className="text-lg font-semibold text-slate-900">
          Profil
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Ingénieur en biotechnologie et bioinformatique (Ingénieur, Université Euromed de Fès),
          fondateur de GenoLabGab — initiative indépendante en biologie computationnelle. Expertise
          en développement de pipelines NGS automatisés, criblage virtuel de composés bioactifs et
          conception de vaccins par vaccinomique inverse. Passionné par la science ouverte et la
          démocratisation des outils bioinformatiques en Afrique.
        </p>
      </section>

      {/* Expérience */}
      <section className="mt-8" aria-labelledby="exp-heading">
        <h2 id="exp-heading" className="text-lg font-semibold text-slate-900">
          Expériences
        </h2>
        <div className="mt-4 space-y-5">
          {experience.map((e) => (
            <div
              key={e.role}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{e.role}</div>
                  <div className="text-sm text-emerald-700">{e.org}</div>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>{e.period}</div>
                  <div>{e.location}</div>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5 pl-4">
                {e.bullets.map((b) => (
                  <li key={b} className="text-sm leading-relaxed text-slate-600 list-disc">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mt-8" aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="text-lg font-semibold text-slate-900">
          Formation
        </h2>
        <div className="mt-4 space-y-4">
          {education.map((e) => (
            <div
              key={e.degree}
              className="flex justify-between rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div>
                <div className="font-semibold text-slate-900">{e.degree}</div>
                <div className="mt-0.5 text-sm text-emerald-700">{e.school}</div>
                {e.highlight && (
                  <div className="mt-1 text-xs font-medium text-emerald-600">{e.highlight}</div>
                )}
              </div>
              <div className="text-right text-xs text-slate-500">
                <div>{e.years}</div>
                <div>{e.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section className="mt-8" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-lg font-semibold text-slate-900">
          Compétences techniques
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-emerald-700">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Langues */}
      <section className="mt-8" aria-labelledby="lang-heading">
        <h2 id="lang-heading" className="text-lg font-semibold text-slate-900">
          Langues
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {languages.map((l) => (
            <div
              key={l.lang}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
            >
              <span className="font-semibold text-slate-900">{l.lang}</span>
              <span className="ml-2 text-slate-500">{l.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="mt-8" aria-labelledby="pub-heading">
        <h2 id="pub-heading" className="text-lg font-semibold text-slate-900">
          Publications sélectionnées
        </h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">
              Evaluation of drought tolerance in faba bean (Vicia faba L.) genotypes using
              physiological and biochemical indices
            </div>
            <div className="mt-1 text-xs italic text-slate-500">
              Keny Karl Mounguele et al. · Agronomy — MDPI · 2025 · Sous révision
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">
              Virtual Screening of 100 Natural Compounds Against HIV-1 Capsid Protein p24
            </div>
            <div className="mt-1 text-xs italic text-slate-500">
              Keny Karl Mounguele · GenoLabGab Blog · 2024 · Publié
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
