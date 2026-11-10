import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";


const DISEASES = ["tuberculosis", "malaria", "antibiotic-resistance"] as const;
type Disease = (typeof DISEASES)[number];

const SAFE_SLUG = /^[a-z0-9-]+$/;
const reportsDir = path.join(process.cwd(), "content/reports");

export interface ReportMeta {
  slug: string;
  title: string;
  date: string;
  disease: Disease;
  summary: string;
  tags: string[];
  dataset?: string;
  readingTime: string;
  locale: string;
}

function isDisease(v: string): v is Disease {
  return (DISEASES as readonly string[]).includes(v);
}

export async function getAllReports(locale: string): Promise<ReportMeta[]> {
  const reports: ReportMeta[] = [];

  for (const disease of DISEASES) {
    const dir = path.join(reportsDir, disease, locale);
    if (!fs.existsSync(dir)) continue;

    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"));

    for (const entry of entries) {
      const filePath = path.join(dir, entry.name);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);
      const slug = entry.name.replace(/\.mdx$/, "");

      reports.push({
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        disease,
        summary: data.summary || "",
        tags: data.tags || [],
        dataset: data.dataset,
        readingTime: readingTime(content).text,
        locale,
      });
    }
  }

  return reports.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getReport(
  disease: string,
  slug: string,
  locale: string
): Promise<{ meta: ReportMeta; content: string } | null> {
  if (!isDisease(disease) || !SAFE_SLUG.test(slug)) return null;

  const filePath = path.join(reportsDir, disease, locale, `${slug}.mdx`);
  if (!filePath.startsWith(reportsDir + path.sep)) return null;
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title || slug,
      date: data.date,
      disease,
      summary: data.summary || "",
      tags: data.tags || [],
      dataset: data.dataset,
      readingTime: readingTime(content).text,
      locale,
    },
    content,
  };
}

