import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pages } from "@/lib/sections";
import HeroCarousel from "@/components/HeroCarousel";
import Terminal from "@/components/Terminal";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "") };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const n = await getTranslations("Nav");

  const slides = [
    { src: "/images/hero-1.jpg", alt: t("heroAlt") },
    { src: "/images/hero-2.png", alt: t("heroAlt2") },
    { src: "/images/hero-3.png", alt: t("heroAlt3") },
  ];

  return (
    <>
    <section className="hero-glow grid w-full lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
    {/* Colonne texte */}
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center lg:px-16">
    <p className="text-xs font-medium uppercase tracking-widest text-primary">
    {t("eyebrow")}
    </p>
    <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">GenoLabGab</h1>
    <p className="max-w-xl text-muted">{t("tagline")}</p>
    <ul className="flex flex-wrap justify-center gap-3">
    {pages.slice(0, 3).map((p) => (
      <li key={p.slug}>
      <Link
      href={`/${p.slug}`}
      className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-sm transition hover:border-primary"
      >
      <span className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />
      {n(p.key)}
      </Link>
      </li>
    ))}
    </ul>
    </div>

    {/* Colonne image : colle au bord droit, pleine hauteur */}
    <div className="relative h-[60vh] lg:h-full">
    <HeroCarousel slides={slides} />
    </div>
    </section>

    {/* Terminal juste sous le demi-cercle, sans espace */}
    <section className="w-full px-4 pb-20 sm:px-6">
    <Terminal />
    </section>
    </>
  );
}
