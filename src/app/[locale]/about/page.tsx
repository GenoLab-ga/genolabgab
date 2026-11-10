import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });
    return {
        title: t("title"),
        description: t("missionText"),
        alternates: pageAlternates(locale, "/about"),
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("About");

    const focusKeys = ["tb", "malaria", "amr"] as const;
    const skillKeys = ["sequencing", "bioinformatics", "genomics", "stats", "programming"] as const;
    const rigorKeys = ["code", "containers", "validation", "traceability"] as const;
    const monitoringKeys = ["mutations", "tools", "publications", "guidelines"] as const;
    const applicationKeys = ["surveillance", "precision", "research"] as const;
    const collaborationKeys = ["research", "hospitals", "publicHealth", "international"] as const;

    return (
        <article className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
        {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t("title")}</h1>

        {/* Mission */}
        <section className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">{t("missionTitle")}</h2>
        <p className="mt-4 leading-relaxed text-muted">{t("missionText")}</p>
        <p className="mt-6 font-medium">{t("focusTitle")}</p>
        <ul className="mt-3 space-y-3">
        {focusKeys.map((k) => (
            <li key={k} className="leading-relaxed text-muted">
            {t(`focus.${k}`)}
            </li>
        ))}
        </ul>
        </section>

        {/* Fondateur */}
        <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("founderTitle")}</h2>
        <div className="mt-4 rounded-lg border border-border bg-surface p-6">
        <p className="font-semibold">{t("founderName")}</p>
        <p className="text-sm text-primary">{t("founderRole")}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t("founderText")}</p>
        </div>
        </section>

        {/* Compétences */}
        <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("skillsTitle")}</h2>
        <ul className="mt-4 space-y-2">
        {skillKeys.map((k) => (
            <li key={k} className="leading-relaxed text-muted">
            {t(`skills.${k}`)}
            </li>
        ))}
        </ul>
        </section>

        {/* Approche scientifique */}
        <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("approachTitle")}</h2>

        <div className="mt-6">
        <h3 className="text-lg font-semibold">{t("rigorTitle")}</h3>
        <p className="mt-2 text-muted">{t("rigorText")}</p>
        <ul className="mt-3 space-y-2">
        {rigorKeys.map((k) => (
            <li key={k} className="leading-relaxed text-muted">
            {t(`rigorPoints.${k}`)}
            </li>
        ))}
        </ul>
        </div>

        <div className="mt-6">
        <h3 className="text-lg font-semibold">{t("monitoringTitle")}</h3>
        <p className="mt-2 text-muted">{t("monitoringText")}</p>
        <ul className="mt-3 space-y-2">
        {monitoringKeys.map((k) => (
            <li key={k} className="leading-relaxed text-muted">
            {t(`monitoringPoints.${k}`)}
            </li>
        ))}
        </ul>
        </div>

        <div className="mt-6">
        <h3 className="text-lg font-semibold">{t("applicationsTitle")}</h3>
        <p className="mt-2 text-muted">{t("applicationsText")}</p>
        <ul className="mt-3 space-y-2">
        {applicationKeys.map((k) => (
            <li key={k} className="leading-relaxed text-muted">
            {t(`applicationsPoints.${k}`)}
            </li>
        ))}
        </ul>
        </div>
        </section>

        {/* Domaines d'expertise (tableau) */}
        <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("expertiseTitle")}</h2>
        <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
        <thead>
        <tr className="bg-surface">
        {Array.from({ length: 3 }).map((_, i) => (
            <th key={i} className="border border-border px-4 py-2 text-left font-semibold">
            {t(`expertiseTable.headers.${i}` as any)}
            </th>
        ))}
        </tr>
        </thead>
        <tbody>
        {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-surface" : ""}>
            {Array.from({ length: 3 }).map((_, j) => (
                <td key={j} className="border border-border px-4 py-2">
                {t(`expertiseTable.rows.${i}.${j}` as any)}
                </td>
            ))}
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        </section>

        {/* Philosophie */}
        <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("philosophyTitle")}</h2>
        <div className="mt-4 space-y-6">
        <div>
        <h3 className="text-lg font-semibold">{t("independenceTitle")}</h3>
        <p className="mt-2 leading-relaxed text-muted">{t("independenceText")}</p>
        </div>
        <div>
        <h3 className="text-lg font-semibold">{t("transparencyTitle")}</h3>
        <p className="mt-2 leading-relaxed text-muted">{t("transparencyText")}</p>
        </div>
        <div>
        <h3 className="text-lg font-semibold">{t("impactTitle")}</h3>
        <p className="mt-2 leading-relaxed text-muted">{t("impactText")}</p>
        </div>
        </div>
        </section>

        {/* Collaborations */}
        <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("collaborationsTitle")}</h2>
        <p className="mt-4 text-muted">{t("collaborationsText")}</p>
        <ul className="mt-3 space-y-2">
        {collaborationKeys.map((k) => (
            <li key={k} className="leading-relaxed text-muted">
            {t(`collaborationsPoints.${k}`)}
            </li>
        ))}
        </ul>
        </section>

        {/* CTA */}
        <section className="mt-12">
        <p className="leading-relaxed text-muted">{t("ctaText")}</p>
        <Link
        href="/contact"
        className="mt-4 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
        {t("ctaButton")}
        </Link>
        </section>
        </article>
    );
}
