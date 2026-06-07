import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export const dynamic = "force-static";

function getArticle(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/blog",
    `${slug}.mdx`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
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
        <MDXRemote source={article.content} />
      </article>
    </div>
  );
}
