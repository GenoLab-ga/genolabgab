import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

// Sécurité : refuse tout slug contenant /, \, .., etc. (anti path-traversal)
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Article = {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    updatedAt?: string;
    description?: string;
    tags?: string[];
  };
};

function getArticle(slug: string): Article | null {
  if (!SLUG_PATTERN.test(slug)) return null;
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, frontmatter: data as Article["frontmatter"] };
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".mdx"))
  .map((file) => ({ slug: file.replace(".mdx", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.frontmatter.title} — GenoLabGab`,
    description: article.frontmatter.description,
    alternates: { canonical: `https://genolabgab.com/blog/${slug}` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.frontmatter.title,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.updatedAt || article.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Keny Karl Mounguele",
      url: "https://genolabgab.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GenoLabGab",
      logo: {
        "@type": "ImageObject",
        url: "https://genolabgab.com/favicon.ico",
      },
    },
    description: article.frontmatter.description || "",
    image: "https://genolabgab.com/og-image.png",
    url: `https://genolabgab.com/blog/${slug}`,
    keywords: article.frontmatter.tags?.join(", ") || "",
  };

  return (
    <>
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
    <p className="text-sm text-slate-400 mb-2">{article.frontmatter.date}</p>
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
    <MDXRemote
    source={article.content}
    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
    </article>
    </div>
    </>
  );
}
