import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublications, type Publication } from "@/lib/get-publications";

export const metadata: Metadata = {
  title: "Publications & Articles — Keny Karl Mounguele",
  description:
    "Publications scientifiques, prépublications et articles de blog de Keny Karl Mounguele en bioinformatique, génomique et vaccinomique.",
  alternates: {
    canonical: "https://genolabgab.vercel.app/publications",
  },
};

export const dynamic = "force-static";

export default function PublicationsPage() {
  const sorted: Publication[] = getAllPublications();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Publications — GenoLabGab",
    url: "https://genolabgab.vercel.app/publications",
    description: "Publications scientifiques et articles de Keny Karl Mounguele.",
    hasPart: sorted.map((p) => ({
      "@type": "ScholarlyArticle",
      name: p.title.fr,
      author: p.authors,
      datePublished: String(p.year),
      publisher: p.journal,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Publications & Articles
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Travaux scientifiques, prépublications et billets de blog
        </p>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-4">
          {[
            {
              label: "Articles scientifiques",
              count: sorted.filter((p) => p.category === "paper").length,
            },
            {
              label: "Articles de blog",
              count: sorted.filter((p) => p.category === "blog").length,
            },
            { label: "Total", count: sorted.length },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2"
            >
              <span className="text-lg font-bold text-slate-900">{s.count}</span>
              <span className="text-sm text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="mt-10 space-y-5">
          {sorted.map((p) => {
            const isPaper = p.category === "paper";

            return (
              <article
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      isPaper
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {p.categoryLabel.fr}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {p.year}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      p.status.fr === "Publié"
                        ? "bg-emerald-50 text-emerald-700"
                        : p.status.fr === "Sous révision"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {p.status.fr}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-slate-900">
                  {p.title.fr}
                </h2>

                <p className="mt-1 text-sm text-slate-500 italic">
                  {p.authors} · {p.journal}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.abstract.fr}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.fr.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {p.href && (
                  <div className="mt-4">
                    {isPaper ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        Lire l&apos;article
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={p.href}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        Lire l&apos;article
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
