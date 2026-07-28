import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    href: "https://github.com/GenoLab-ga",
    label: "GitHub",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
{
  href: "https://linkedin.com/in/karl-mounguele",
  label: "LinkedIn",
  icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
},
{
  href: "https://orcid.org/0009-0006-6706-0069",
  label: "ORCID",
  icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.484 3.872-3.722 0-2.016-1.284-3.722-3.828-3.722h-2.341z" />
    </svg>
  ),
},
];

const footerNav = [
  { href: "/", label: "Accueil" },
{ href: "/about", label: "À propos" },
{ href: "/research", label: "Recherche" },
{ href: "/publications", label: "Publications" },
{ href: "/projects", label: "Projets" },
{ href: "/cv", label: "CV" },
{ href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-0 border-t border-slate-800 bg-[#0a0f1a]">
    {/* Decorative top gradient line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

    <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
    {/* Main grid */}
    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
    {/* Brand */}
    <div className="lg:col-span-1">
    <Link href="/" className="inline-flex items-center gap-2.5 group">
    <Image
    src="/images/logo.png"
    alt="GenoLabGab Logo"
    width={36}
    height={36}
    className="rounded-lg"
    />
    <span className="text-lg font-bold text-white">
    GenoLab<span className="text-emerald-400">Gab</span>
    </span>
    </Link>
    <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
    Initiative indépendante en biologie computationnelle fondée par Keny Karl Mounguele.
    Génomique · Bioinformatique structurale · Vaccinomique.
    </p>
    {/* Social links */}
    <div className="mt-6 flex gap-3">
    {socialLinks.map((s) => (
      <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noreferrer"
      aria-label={s.label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-400 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
      >
      {s.icon}
      </a>
    ))}
    </div>
    </div>

    {/* Navigation */}
    <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Navigation</h3>
    <ul className="mt-5 space-y-3">
    {footerNav.map((l) => (
      <li key={l.href}>
      <Link
      href={l.href}
      className="text-sm text-slate-400 transition hover:text-emerald-400"
      >
      {l.label}
      </Link>
      </li>
    ))}
    </ul>
    </div>

    {/* Expertise */}
    <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Expertise</h3>
    <ul className="mt-5 space-y-3">
    {[
      "Génomique computationnelle",
      "Bioinformatique structurale",
      "Vaccinomique & Immunoinformatique",
      "Analyse NGS",
      "Docking moléculaire",
    ].map((item) => (
      <li key={item} className="text-sm text-slate-400">
      {item}
      </li>
    ))}
    </ul>
    </div>

    {/* Contact */}
    <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Contact</h3>
    <ul className="mt-5 space-y-3">
    <li>
    <a
    href="mailto:genolabgab@proton.me"
    className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
    >
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
    genolabgab@proton.me
    </a>
    </li>
    <li className="flex items-start gap-2 text-sm text-slate-400">
    <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
    </svg>
    <span>Université Euromed de Fès<br />Fès, Maroc</span>
    </li>
    </ul>
    </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
    <p className="text-xs text-slate-500">
    © {new Date().getFullYear()} GenoLabGab · Keny Karl Mounguele · Tous droits réservés
    </p>
    <div className="flex items-center gap-1 text-xs text-slate-600">
    Propulsé par
    <span className="font-medium text-slate-400">Next.js</span>
    <span className="mx-1">·</span>
    Déployé sur
    <span className="font-medium text-slate-400">Vercel</span>
    </div>
    </div>
    </div>
    </footer>
  );
}
