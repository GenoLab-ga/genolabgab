import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pages } from "@/lib/sections";

export default function Footer() {
    const t = useTranslations("Footer");
    const n = useTranslations("Nav");

    const topics = pages.slice(0, 3); // les 3 maladies
    const others = pages.slice(3); // rapports, à propos, contact

    return (
        <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
        <p className="text-lg font-semibold">GenoLabGab</p>
        <p className="mt-2 max-w-xs text-sm text-muted">{t("tagline")}</p>
        </div>
        <div>
        <p className="text-sm font-medium">{t("topics")}</p>
        <ul className="mt-3 space-y-2 text-sm text-muted">
        {topics.map((p) => (
            <li key={p.slug}>
            <Link href={`/${p.slug}`} className="hover:text-primary">{n(p.key)}</Link>
            </li>
        ))}
        </ul>
        </div>
        <div>
        <p className="text-sm font-medium">{t("explore")}</p>
        <ul className="mt-3 space-y-2 text-sm text-muted">
        {others.map((p) => (
            <li key={p.slug}>
            <Link href={`/${p.slug}`} className="hover:text-primary">{n(p.key)}</Link>
            </li>
        ))}
        </ul>
        </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} GenoLabGab · {t("rights")}
        </div>
        </footer>
    );
}
