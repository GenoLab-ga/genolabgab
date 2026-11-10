"use client"; // il utilise un état (menu ouvert/fermé) : il s'exécute dans le navigateur

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { pages } from "@/lib/sections";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    const t = useTranslations("Nav");
    const pathname = usePathname(); // adresse actuelle, sans la langue
    const [open, setOpen] = useState(false);

    // Lien actif en bleu, les autres en gris
    const linkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
        pathname === href ? "text-primary" : "text-black/70 hover:text-black"
    }`;

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-band/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
        <Image src="/images/logo.png" alt="" width={60} height={60} className="h-12 w-auto object-contain" />
        <span className="text-black font-semibold tracking-tight">GenoLabGab</span>
        </Link>

        {/* Menu d'ordinateur : caché sur petit écran */}
        <nav aria-label={t("menu")} className="hidden items-center gap-1 lg:flex">
        {pages.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className={linkClass(`/${p.slug}`)}>
            {t(p.key)}
            </Link>
        ))}
        </nav>

        <div className="flex items-center gap-3">
        <LanguageSwitcher />
        {/* Bouton hamburger : visible seulement sur petit écran */}
        <button
        type="button"
        className="rounded-md border border-border p-2 lg:hidden"
        aria-expanded={open}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen(!open)}
        >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
        </button>
        </div>
        </div>

        {/* Menu de téléphone */}
        {open && (
            <nav aria-label={t("menu")} className="border-t border-border bg-background px-6 py-3 lg:hidden">
            <ul className="flex flex-col">
            {pages.map((p) => (
                <li key={p.slug}>
                <Link
                href={`/${p.slug}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 py-3 text-base ${linkClass(`/${p.slug}`)}`}
                >
                <span className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />
                {t(p.key)}
                </Link>
                </li>
            ))}
            </ul>
            </nav>
        )}
        </header>
    );
}
