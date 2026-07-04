import type { Metadata } from "next";
import { researchAxes } from "@/data/site";

export const metadata: Metadata = {
  title: "Recherche — Génomique, Bioinformatique structurale & Vaccinomique",
  description:
    "Axes de recherche de Keny Karl Mounguele : génomique computationnelle, bioinformatique structurale et docking moléculaire, vaccinomique et immunoinformatique, biologie des plantes.",
  alternates: {
    canonical: "https://genolabgab.vercel.app/research",
  },
};

export const lastModified = "2026-06-05"; // ← à bumper quand tu modifies cette page

export const dynamic = "force-static";

export default function ResearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "GenoLabGab — Recherche en bioinformatique",
    url: "https://genolabgab.vercel.app/research",
    description:
      "Axes de recherche en génomique computationnelle, bioinformatique structurale et vaccinomique.",
    member: {
      "@type": "Person",
      name: "Keny Karl Mounguele",
    },
    knowsAbout: researchAxes.map((a) => a.title.fr),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Recherche
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Axes de recherche en bioinformatique computationnelle
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {researchAxes.map((axis, i) => (
            <article
              key={i}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="text-3xl">{axis.icon}</div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{axis.title.fr}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{axis.description.fr}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {axis.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Outils & Technologies */}
        <section className="mt-16" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
            Outils & Technologies
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                category: "Analyse NGS",
                tools: ["fastp", "BWA-MEM", "GATK", "Samtools", "bcftools", "SnpEff", "Snakemake"],
                color: "emerald",
              },
              {
                category: "Docking Moléculaire",
                tools: ["AutoDock Vina", "Smina", "Glide", "GNINA", "rDock"],
                color: "blue",
              },
              {
                category: "Modélisation 3D",
                tools: ["AlphaFold2", "ColabFold", "RoseTTAFold", "I-TASSER", "MODELLER"],
                color: "purple",
              },
              {
                category: "Visualisation",
                tools: ["PyMOL", "ChimeraX", "Discovery Studio", "VMD", "Maestro"],
                color: "amber",
              },
              {
                category: "Immunoinformatique",
                tools: ["NetMHCpan", "IEDB", "BepiPred", "VaxiJen", "NetCTL", "ABCpred"],
                color: "rose",
              },
              {
                category: "Langages",
                tools: ["Python", "R", "Bash", "Perl", "Julia"],
                color: "slate",
              },
            ].map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-sm font-semibold text-slate-900">{group.category}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                    >
                      {tool}
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
