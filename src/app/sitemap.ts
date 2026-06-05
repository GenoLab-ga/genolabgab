import type { MetadataRoute } from "next";

const BASE_URL = "https://genolabgab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/research`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/publications`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/projects`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/cv`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified,
    changeFrequency,
    priority,
  }));
}
