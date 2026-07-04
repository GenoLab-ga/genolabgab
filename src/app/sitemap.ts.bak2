import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const BASE_URL = "https://genolabgab.vercel.app";

/**
 * Récupère la date du dernier commit Git touchant ce fichier.
 * Fallback sur la date actuelle si le fichier n'a pas encore d'historique Git
 * (ex: build local avant premier commit, ou repo shallow-clone sur Vercel).
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

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => {
    const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
    const stats = fs.statSync(filePath);
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: stats.mtime,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
