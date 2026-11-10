"use client"; // ce composant réagit aux clics : il s'exécute dans le navigateur

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div
        role="group"
        aria-label="Language"
        className="flex gap-1 rounded-full border border-border bg-surface p-1 text-sm"
        >
        {routing.locales.map((l) => (
            <button
            key={l}
            type="button"
            aria-pressed={l === locale}
            onClick={() => router.replace(pathname, { locale: l })}
            className={`rounded-full px-3 py-1 font-medium uppercase transition ${
                l === locale ? "bg-primary text-white" : "text-muted hover:text-foreground"
            }`}
            >
            {l}
            </button>
        ))}
        </div>
    );
}
