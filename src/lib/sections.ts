// Source unique : menu, pied de page et routes utilisent cette liste.
// "key" renvoie aux textes dans messages/*.json (rubrique "Nav")
// "dot" est la couleur de la petite pastille associée
export const pages = [
    { slug: "tuberculosis", key: "tb", dot: "bg-tb" },
{ slug: "malaria", key: "malaria", dot: "bg-malaria" },
{ slug: "antibiotic-resistance", key: "amr", dot: "bg-amr" },
{ slug: "reports", key: "reports", dot: "bg-primary" },
{ slug: "about", key: "about", dot: "bg-primary" },
{ slug: "contact", key: "contact", dot: "bg-primary" },
] as const;
