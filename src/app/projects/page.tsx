import type { Metadata } from "next";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projets — Pipelines bioinformatiques & Recherche",
  description:
    "Projets de Keny Karl Mounguele : génomique du riz 3K-RGP, vaccin anti-paludéen TBV Pfs48/45, criblage anti-VIH p24, tolérance à la sécheresse chez Vicia faba.",
  alternates: {
    canonical: "https://genolabgab.vercel.app/projects",
  },
};

export const dynamic = "force-static";

const statusColors: Record<string, { bg: string; text: string }> = {
  amber: { bg: "bg-amber-50", text: "text-amber-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-700" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Projets</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Pipelines bioinformatiques, projets de recherche et initiatives scientifiques
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const sc = statusColors[project.statusColor] ?? statusColors.emerald;
          return (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-3xl">{project.icon}</div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${sc.bg} ${sc.text}`}
                >
                  {project.status.fr}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{project.title.fr}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {project.description.fr}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* GitHub CTA */}
      <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-7 text-center">
        <div className="text-3xl">🐙</div>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">Code source sur GitHub</h2>
        <p className="mt-2 text-sm text-slate-600">
          Les scripts, pipelines et notebooks de ces projets sont disponibles sur le GitHub de
          GenoLabGab.
        </p>
        <a
          href="https://github.com/GenoLab-ga"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Voir sur GitHub
        </a>
      </div>
    </div>
  );
}
