import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Keny Karl Mounguele · GenoLabGab",
  description:
    "Contactez Keny Karl Mounguele pour des collaborations scientifiques, stages, ou discussions en bioinformatique et génomique computationnelle.",
  alternates: {
    canonical: "https://genolabgab.vercel.app/contact",
  },
};

export const dynamic = "force-static";

const contacts = [
  {
    icon: "✉️",
    label: "Email",
    value: "mounguele.kenykarl@gmail.com",
    href: "mailto:mounguele.kenykarl@gmail.com",
    description: "Pour toute collaboration ou question scientifique",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/GenoLab-ga",
    href: "https://github.com/GenoLab-ga",
    description: "Scripts, pipelines et notebooks",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "Keny Karl Mounguele",
    href: "https://linkedin.com/in/keny-karl-mounguele",
    description: "Réseau professionnel",
  },
  {
    icon: "🆔",
    label: "ORCID",
    value: "0009-0006-6706-0069",
    href: "https://orcid.org/0009-0006-6706-0069",
    description: "Identifiant chercheur international",
  },
  {
    icon: "📍",
    label: "Localisation",
    value: "Fès, Maroc",
    href: undefined,
    description: "Université Euromed de Fès",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — GenoLabGab",
    url: "https://genolabgab.vercel.app/contact",
    mainEntity: {
      "@type": "Person",
      name: "Keny Karl Mounguele",
      email: "mounguele.kenykarl@gmail.com",
      url: "https://genolabgab.vercel.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 max-w-xl text-lg text-slate-600">
          Je suis ouvert aux collaborations scientifiques, stages, projets de recherche, ou tout
          simplement à des échanges autour de la bioinformatique.
        </p>

        {/* Contact cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {contacts.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{c.icon}</div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={c.href.startsWith("mailto") ? undefined : "noreferrer"}
                      className="mt-0.5 block font-semibold text-slate-900 hover:text-emerald-700 transition break-all"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="mt-0.5 block font-semibold text-slate-900">{c.value}</span>
                  )}
                  <p className="mt-1 text-xs text-slate-500">{c.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Availability note */}
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
            <div>
              <h2 className="font-semibold text-emerald-800">Disponible pour collaboration</h2>
              <p className="mt-1 text-sm leading-relaxed text-emerald-700">
                Je suis actuellement disponible pour des collaborations en recherche, des stages
                post-master, ou des projets freelance en bioinformatique. N'hésitez pas à me
                contacter pour discuter de vos projets.
              </p>
            </div>
          </div>
        </div>

        {/* Email CTA */}
        <div className="mt-10 text-center">
          <a
            href="mailto:mounguele.kenykarl@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Envoyer un email
          </a>
        </div>
      </div>
    </>
  );
}
