import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://genolabgab.com";

/**
 * Chaque page statique déclare sa propre date de dernière modification
 * via `export const lastModified = "YYYY-MM-DD"` en tête de fichier.
 * On importe dynamiquement ces modules pour lire la valeur, exactement
 * comme le blog lit le frontmatter de ses .mdx.
 *
 * Avantage vs git log : aucune dépendance à la profondeur de clone Git
 * de l'environnement de build (shallow clone Vercel = source non fiable,
 * cf. incident précédent). La donnée est portée par le code source lui-même,
 * versionnée avec lui, sans intermédiaire externe.
 */
const STATIC_PAGES = [
  { route: "/", modulePath: "../app/page", priority: 1.0, changeFrequency: "monthly" as const },
  { route: "/about", modulePath: "../app/about/page", priority: 0.9, changeFrequency: "monthly" as const },
  { route: "/research", modulePath: "../app/research/page", priority: 0.9, changeFrequency: "monthly" as const },
  { route: "/publications", modulePath: "../app/publications/page", priority: 0.8, changeFrequency: "weekly" as const },
  { route: "/projects", modulePath: "../app/projects/page", priority: 0.8, changeFrequency: "monthly" as const },
  { route: "/blog", modulePath: "../app/blog/page", priority: 0.8, changeFrequency: "weekly" as const },
  { route: "/cv", modulePath: "../app/cv/page", priority: 0.7, changeFrequency: "monthly" as const },
  { route: "/contact", modulePath: "../app/contact/layout", priority: 0.6, changeFrequency: "yearly" as const },
];

async function getStaticRoutes(): Promise<MetadataRoute.Sitemap> {
  return Promise.all(
    STATIC_PAGES.map(async ({ route, modulePath, priority, changeFrequency }) => {
      let lastModified = new Date();
      try {
        const mod = await import(modulePath);
        if (mod.lastModified) lastModified = new Date(mod.lastModified);
      } catch {
        // module introuvable ou export absent -> fallback silencieux
      }
      return {
        url: `${BASE_URL}${route === "/" ? "" : route}`,
        lastModified,
        priority,
        changeFrequency,
      };
    })
  );
}

function getBlogEntries(): { slug: string; updatedAt: string }[] {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      // `filename` provient de fs.readdirSync(dir), pas d'une entrée utilisateur -> pas de traversal possible
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8"); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      const { data } = matter(raw);
      const updatedAt = data.updatedAt || data.date || new Date().toISOString();
      return { slug, updatedAt };
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = await getStaticRoutes();
  const blogRoutes: MetadataRoute.Sitemap = getBlogEntries().map(
    ({ slug, updatedAt }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );
  return [...staticRoutes, ...blogRoutes];
}
