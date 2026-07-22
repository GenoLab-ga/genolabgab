import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false; // 404 immédiat pour tout slug absent de generateStaticParams

function getArticle(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null;

  const blogDir = path.join(process.cwd(), "src/content/blog");
  // `slug` est validé par SLUG_PATTERN (kebab-case strict) juste au-dessus -> pas de traversal possible
  const filePath = path.join(blogDir, `${slug}.mdx`); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal

  // Vérifie que le chemin résolu reste bien dans le dossier autorisé
  // (défense en profondeur contre un contournement éventuel du regex)
  const resolvedPath = path.resolve(filePath); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  if (!resolvedPath.startsWith(path.resolve(blogDir) + path.sep)) return null;

  if (!fs.existsSync(resolvedPath)) return null;
  const raw = fs.readFileSync(resolvedPath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(".mdx", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: article?.frontmatter.title ?? "Article — GenoLabGab",
    description: article?.frontmatter.description ?? "",
    alternates: {
      canonical: `https://genolabgab.vercel.app/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-slate-400 mb-2">
        {article.frontmatter.date}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">
        {article.frontmatter.title}
      </h1>
      <div className="flex flex-wrap gap-2 mb-10">
        {article.frontmatter.tags?.map((tag: string) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <article className="prose prose-slate max-w-none">
        <MDXRemote source={article.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </div>
  );
}
