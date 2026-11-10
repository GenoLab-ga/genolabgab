import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { pages } from "@/lib/sections";
import { getAllReports } from "@/lib/mdx";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Accueil + sections, dans chaque langue
  const paths = ["", ...pages.map((p) => `/${p.slug}`)];
  for (const path of paths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  // Un rapport = une adresse par langue où il existe
  for (const locale of routing.locales) {
    const reports = await getAllReports(locale);
    for (const r of reports) {
      const date = new Date(r.date);
      entries.push({
        url: `${SITE_URL}/${locale}/reports/${r.disease}/${r.slug}`,
        lastModified: isNaN(date.getTime()) ? undefined : date,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
