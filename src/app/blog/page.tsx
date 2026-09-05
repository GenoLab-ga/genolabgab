import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Bioinformatique & Génomique computationnelle",
  description:
    "Articles et analyses bioinformatiques de Keny Karl Mounguele : génomique, docking moléculaire, résistance antipaludéenne, pipelines NGS.",
  alternates: {
    canonical: "https://genolabgab.com/blog",
  },
};

export const lastModified = "2026-06-07"; // ← à bumper quand tu modifies cette page
export const dynamic = "force-static";

function getArticles() {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      // `file` provient de fs.readdirSync(dir), pas d'une entrée utilisateur -> pas de traversal possible
      const raw = fs.readFileSync(path.join(dir, file), "utf8"); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      const { data } = matter(raw);
      return { slug: file.replace(".mdx", ""), ...data } as {
        slug: string;
        title: string;
        date: string;
        description: string;
        tags: string[];
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export default function BlogPage() {
  const articles = getArticles();
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Blog
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Analyses bioinformatiques, pipelines et notes de recherche
      </p>
      <div className="mt-10 space-y-6">
        {articles.length === 0 ? (
          <p className="text-slate-500">Aucun article pour le moment.</p>
        ) : (
          articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-xs text-slate-400 mb-1">{a.date}</p>
              <h2 className="text-lg font-semibold text-slate-900">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{a.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
