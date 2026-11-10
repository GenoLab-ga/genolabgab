import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllReports } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Reports" });
    return { title: t("title"), description: t("intro"), alternates: pageAlternates(locale, "/reports") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function ReportsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Reports");
    const n = await getTranslations("Nav");

    const reports = await getAllReports(locale);

    const diseaseColors = {
        tuberculosis: "bg-tb",
        malaria: "bg-malaria",
        "antibiotic-resistance": "bg-amr",
    };

    return (
        <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("intro")}</p>

        {reports.length === 0 ? (
            <p className="mt-8 rounded-lg border border-border bg-surface p-6 text-center text-muted">
            {t("empty")}
            </p>
        ) : (
            <ul className="mt-8 space-y-6">
            {reports.map((report) => (
                <li
                key={report.slug}
                className="rounded-lg border border-border bg-white p-6 shadow-sm transition hover:border-primary"
                >
                <div className="flex items-start gap-4">
                <span
                className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${
                    diseaseColors[report.disease]
                }`}
                />
                <div className="flex-1">
                <Link
                href={`/reports/${report.disease}/${report.slug}`}
                className="text-xl font-semibold hover:text-primary"
                >
                {report.title}
                </Link>
                <p className="mt-2 text-sm text-muted">{report.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                <time dateTime={report.date}>
                {new Date(report.date).toLocaleDateString(locale)}
                </time>
                <span>·</span>
                <span>{report.readingTime}</span>
                {report.dataset && (
                    <>
                    <span>·</span>
                    <span className="rounded-full bg-surface px-2 py-0.5">
                    {report.dataset}
                    </span>
                    </>
                )}
                </div>
                {report.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                    {report.tags.map((tag) => (
                        <span
                        key={tag}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs"
                        >
                        {tag}
                        </span>
                    ))}
                    </div>
                )}
                </div>
                </div>
                </li>
            ))}
            </ul>
        )}
        </section>
    );
}
