import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getReport } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import MDXContent from "@/components/MDXContent";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getAllReports } from "@/lib/mdx";

type Props = {
    params: Promise<{ locale: string; disease: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, disease, slug } = await params;
    const report = await getReport(disease, slug, locale);
    if (!report) return {};

    // On ne déclare la version dans l'autre langue que si elle existe vraiment
    const other = locale === "fr" ? "en" : "fr";
    const hasOther = (await getReport(disease, slug, other)) !== null;
    const path = `/reports/${disease}/${slug}`;

    return {
        title: report.meta.title,
        description: report.meta.summary,
        alternates: {
            canonical: `/${locale}${path}`,
            ...(hasOther ? { languages: { [locale]: `/${locale}${path}`, [other]: `/${other}${path}` } } : {}),
        },
        openGraph: { type: "article", title: report.meta.title, description: report.meta.summary },
    };
}

// Toute adresse non listée ci-dessous renvoie une page 404
export const dynamicParams = false;

// Liste tous les rapports à préparer au moment du build
export async function generateStaticParams() {
    const params: { locale: string; disease: string; slug: string }[] = [];
    for (const locale of routing.locales) {
        const reports = await getAllReports(locale);
        for (const r of reports) {
            params.push({ locale, disease: r.disease, slug: r.slug });
        }
    }
    return params;
}

export default async function ReportPage({ params }: Props) {
    const { locale, disease, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Reports");

    const report = await getReport(disease, slug, locale);
    if (!report) notFound();


    return (
        <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
        href="/reports"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
        ← {t("back")}
        </Link>

        <header>
        <h1 className="text-4xl font-semibold tracking-tight">
        {report.meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
        <time dateTime={report.meta.date}>
        {new Date(report.meta.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}
        </time>
        <span>·</span>
        <span>{report.meta.readingTime}</span>
        </div>
        </header>

        <div className="mt-12">
        <MDXContent source={report.content} />
        </div>
        </article>
    );
}
