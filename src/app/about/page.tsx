import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos — Keny Karl Mounguele",
  description:
    "Ingénieur en biotechnologie et bioinformatique, fondateur de GenoLabGab. Découvrez mon parcours, mes compétences et mes centres d'intérêt en biologie computationnelle.",
  alternates: {
    canonical: "https://genolabgab.com/about",
  },
};

export const lastModified = "2026-06-05"; // ← à bumper quand tu modifies cette page

export const dynamic = "force-static";

const skills = [
  {
    category: "Génomique & NGS",
    items: ["BWA-MEM", "GATK", "Samtools", "bcftools", "fastp", "SnpEff", "Snakemake", "PLINK"],
  },
  {
    category: "Docking & Modélisation",
    items: [
      "AutoDock Vina",
      "AlphaFold2",
      "ColabFold",
      "PyMOL",
      "ChimeraX",
      "Discovery Studio",
      "Maestro",
    ],
  },
  {
    category: "Immunoinformatique",
    items: [
      "NetMHCpan",
      "IEDB",
      "BepiPred",
      "VaxiJen",
      "ProtParam",
      "NetCTL",
      "ABCpred",
    ],
  },
  {
    category: "Langages & Outils",
    items: ["Python", "R", "Bash", "Linux", "Git", "Jupyter", "VS Code"],
  },
];

const education = [
  {
    degree: "Master en Biotechnologie & Bioinformatique",
    school: "Université Euromed de Fès",
    location: "Fès, Maroc",
    years: "2022 – 2025",
    icon: "🎓",
  },
  {
    degree: "Licence 2 en Ingénierie de la santé",
    school: "Ecole Supérieure d'Ingénierie de la Santé et de Management de Projets",
    location: "Casablanca, Maroc",
    years: "2020 – 2022",
    icon: "🎓",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Keny Karl Mounguele",
      jobTitle: "Ingénieur Bioinformaticien",
      affiliation: {
        "@type": "Organization",
        name: "Université Euromed de Fès",
      },
      knowsAbout: [
        "Bioinformatics",
        "Computational Genomics",
        "Structural Bioinformatics",
        "Molecular Docking",
        "Vaccinomics",
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Université Euromed de Fès",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              À propos
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Ingénieur en biotechnologie et bioinformatique, aspirant doctorant.
            </p>
          </div>
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-emerald-100">
            <Image
              src="/images/avatar.svg"
              alt="Keny Karl Mounguele"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <section className="mt-12" aria-labelledby="bio-heading">
          <h2 id="bio-heading" className="text-xl font-semibold text-slate-900">
            Qui suis-je ?
          </h2>
          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Je suis <strong>Keny Karl Mounguele</strong>, ingénieur en biotechnologie et
              bioinformatique (Master, Université Euromed de Fès) et fondateur de{" "}
              <strong>GenoLabGab</strong> - une initiative indépendante en biologie computationnelle
              basée au Maroc.
            </p>
            <p>
              Mes travaux se situent à l&apos;intersection de la <strong>génomique</strong>, de la{" "}
              <strong>bioinformatique structurale</strong> et de la{" "}
              <strong>biologie moléculaire</strong>. Je développe des pipelines automatisés pour
              l&apos;analyse NGS, le criblage virtuel de molécules bioactives, et la conception de
              vaccins par approches vaccinomiques.
            </p>
            <p>
              Parallèlement à la recherche, je m&apos;investis dans la communication scientifique
              ouverte à travers le blog <strong>GenoLabGab</strong>, en publiant des tutoriels, des
              billets de recherche et des analyses bioinformatiques accessibles.
            </p>
          </div>
        </section>

        {/* Research Interests */}
        <section className="mt-12" aria-labelledby="interests-heading">
          <h2 id="interests-heading" className="text-xl font-semibold text-slate-900">
            Centres d&apos;intérêt scientifique
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Génomique des populations",
              "Criblage virtuel de composés naturels",
              "Conception de vaccins par vaccinomique inverse",
              "Automatisation de pipelines bioinformatiques",
              "Science ouverte & communication scientifique",
              "Intelligence artificielle appliquée en biologie",
            ].map((interest) => (
              <li
                key={interest}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                {interest}
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mt-12" aria-labelledby="education-heading">
          <h2 id="education-heading" className="text-xl font-semibold text-slate-900">
            Formation
          </h2>
          <div className="mt-5 space-y-4">
            {education.map((e) => (
              <div
                key={e.degree}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="text-2xl">{e.icon}</div>
                <div>
                  <div className="font-semibold text-slate-900">{e.degree}</div>
                  <div className="mt-1 text-sm text-emerald-700">{e.school}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {e.location} · {e.years}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-12" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-xl font-semibold text-slate-900">
            Compétences techniques
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {skills.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                  {group.category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
