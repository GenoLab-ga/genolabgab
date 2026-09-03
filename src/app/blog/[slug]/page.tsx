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
    </>
  );
}
