import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const BASE_URL = "https://genolabgab.vercel.app";

/**
 * Récupère la date du dernier commit Git touchant ce fichier.
 * Fiable en local ET sur Vercel (contrairement à fs.statSync().mtime,
 * qui reflète l'heure du `git checkout` après un clone frais, pas la
 * date de dernière modification réelle du contenu).
 * Fallback sur la date actuelle si aucun historique Git n'est trouvé
 * (fichier non commité, ou repo shallow-clone sans historique).
 */
function getLastModifiedFromGit(relativeFilePath: string): Date {
  try {
    const timestamp = execSync(
      `git log -1 --format=%aI -- "${relativeFilePath}"`,
      { cwd: process.cwd(), stdio: ["pipe", "pipe", "ignore"] }
    )
      .toString()
      .trim();
    return timestamp ? new Date(timestamp) : new Date();
  } catch {
    return new Date();
  }
}

function getBlogSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: getLastModifiedFromGit("src/app/page.tsx"),
      priority: 1.0,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: getLastModifiedFromGit("src/app/about/page.tsx"),
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: getLastModifiedFromGit("src/app/research/page.tsx"),
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/publications`,
      lastModified: getLastModifiedFromGit("src/app/publications/page.tsx"),
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: getLastModifiedFromGit("src/app/projects/page.tsx"),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: getLastModifiedFromGit("src/app/blog/page.tsx"),
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/cv`,
      lastModified: getLastModifiedFromGit("src/app/cv/page.tsx"),
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: getLastModifiedFromGit("src/app/contact/page.tsx"),
      priority: 0.6,
      changeFrequency: "yearly",
    },
  ];

  // IMPORTANT : on utilise git log ici aussi, PAS fs.statSync(...).mtime.
  // Sur Vercel, un clone frais donne le même mtime (heure du checkout)
  // à tous les fichiers, ce qui recrée le bug initial du sitemap.
  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: getLastModifiedFromGit(`src/content/blog/${slug}.mdx`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
