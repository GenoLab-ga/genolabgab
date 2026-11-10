import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { pages } from "@/lib/sections";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; section: string }> };

// Prépare une page par langue et par section
export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
    pages.map((p) => ({ locale, section: p.slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, section } = await params;
    const page = pages.find((p) => p.slug === section);
    if (!page) return {};
    const t = await getTranslations({ locale, namespace: "Sections" });
    return {
        title: t(`${page.key}.title`),
        description: t(`${page.key}.intro`),
        alternates: pageAlternates(locale, `/${page.slug}`),
    };
}

export default async function SectionPage({ params }: Props) {
    const { locale, section } = await params;
    setRequestLocale(locale);

    const page = pages.find((p) => p.slug === section);
    if (!page) notFound(); // adresse inconnue = page 404

    const t = await getTranslations("Sections");

    return (
        <article className="mx-auto max-w-3xl px-6 py-20">
        <span className={`inline-block h-2 w-12 rounded-full ${page.dot}`} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">{t(`${page.key}.title`)}</h1>
        <p className="mt-4 text-lg text-muted">{t(`${page.key}.intro`)}</p>
        <p className="mt-8 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        {t("soon")}
        </p>
        </article>
    );
}
