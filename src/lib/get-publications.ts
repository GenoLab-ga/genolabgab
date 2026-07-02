import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Publication = {
  id: string;
  year: number;
  category: "paper" | "blog";
  categoryLabel: { fr: string; en: string };
  title: { fr: string; en: string };
  authors: string;
  journal: string;
  status: { fr: string; en: string };
  abstract: { fr: string; en: string };
  tags: { fr: string[]; en: string[] };
  href?: string;
  _timestamp: number;
};

/* ── Publications externes (journaux) ── */
const externalPublications: Omit<Publication, "_timestamp">[] = [
  {
    id: "pub-1",
    year: 2025,
    category: "paper",
    categoryLabel: { fr: "Article scientifique", en: "Scientific paper" },
    title: {
      fr: "Evaluation of drought tolerance in faba bean (Vicia faba L.) genotypes using physiological and biochemical indices",
      en: "Evaluation of drought tolerance in faba bean (Vicia faba L.) genotypes using physiological and biochemical indices",
    },
    authors: "Keny Karl Mounguele et al.",
    journal: "Agronomy — MDPI",
    status: { fr: "Publié", en: "Published" },
    abstract: {
      fr: "Étude sur la tolérance à la sécheresse chez la fève (Vicia faba) — analyse phénotypique et biochimique sous stress hydrique. Publié dans Agronomy (MDPI).",
      en: "Study on drought tolerance in faba bean (Vicia faba) — phenotypic and biochemical analysis under water stress. Published in Agronomy (MDPI).",
    },
    tags: {
      fr: ["Vicia faba", "Tolérance à la sécheresse", "Phénotypage"],
      en: ["Vicia faba", "Drought tolerance", "Phenotyping"],
    },
    href: "https://doi.org/10.3390/agronomy16111064",
  },
];

/* ── Lecture dynamique des MDX ── */
function getBlogArticles(): Publication[] {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(".mdx", "");

      return {
        id: `blog-${slug}`,
        year: new Date(data.date).getFullYear(),
        category: "blog" as const,
        categoryLabel: { fr: "Analyse bioinformatique", en: "Bioinformatics analysis" },
        title: { fr: data.title, en: data.title },
        authors: "Keny Karl Mounguele",
        journal: "GenoLabGab Blog",
        status: { fr: "Publié", en: "Published" },
        abstract: { fr: data.description, en: data.description },
        tags: { fr: data.tags || [], en: data.tags || [] },
        href: `/blog/${slug}`,
        _timestamp: new Date(data.date).getTime(),
      };
    })
    .sort((a, b) => b._timestamp - a._timestamp);
}

/* ── Fusion + tri ── */
export function getAllPublications(): Publication[] {
  const blogs = getBlogArticles();
  const externals = externalPublications.map((p) => ({
    ...p,
    _timestamp: new Date(`${p.year}-06-01`).getTime(),
  }));

  return [...blogs, ...externals].sort((a, b) => b._timestamp - a._timestamp);
}
