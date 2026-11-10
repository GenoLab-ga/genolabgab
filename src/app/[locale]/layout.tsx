import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import { SITE_URL } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: new URL(SITE_URL),
    // "%s" sera remplacé par le titre de chaque page : "Tuberculose · GenoLabGab"
    title: { default: t("title"), template: "%s · GenoLabGab" },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "GenoLabGab",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title: t("title"),
      description: t("description"),
      images: ["/images/logo.png"],
    },
    twitter: { card: "summary", title: t("title"), description: t("description"), images: ["/images/logo.png"] },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Nav" });

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
    <body className="flex min-h-screen flex-col">
    <NextIntlClientProvider>
    {/* Lien invisible, qui apparaît quand on navigue au clavier (touche Tab) */}
    <a
    href="#contenu"
    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
    >
    {t("skip")}
    </a>
    <Header />
    <main id="contenu" className="flex-1">
    {children}
    </main>
    <Footer />
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
