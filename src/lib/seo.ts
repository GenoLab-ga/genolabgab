// Adresse du site (modifiable par variable d'environnement)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://genolabgab.com";

// Adresses de référence d'une page et de ses versions de langue
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      fr: `/fr${path}`,
      en: `/en${path}`,
      "x-default": `/fr${path}`, // version par défaut
    },
  };
}

