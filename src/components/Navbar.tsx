"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/research", label: "Recherche" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Projets" },
  { href: "/cv", label: "CV" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Verrouillage du scroll + fermeture à Échap quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-rule bg-white/95 backdrop-blur"
          : "border-transparent bg-white"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt=""
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-navy-900">
            GenoLab<span className="text-accent">Gab</span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-flex min-h-11 cursor-pointer items-center px-3.5 text-sm font-medium transition-colors duration-150 ${
                    active ? "text-navy-900" : "text-slate-600 hover:text-navy-900"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-navy-700 transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <Link
              href="/contact"
              className="inline-flex min-h-10 cursor-pointer items-center rounded-md bg-navy-700 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-800"
            >
              Me contacter
            </Link>
          </li>
        </ul>

        {/* Bouton menu mobile */}
        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-rule bg-white lg:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {[...navLinks, { href: "/contact", label: "Contact" }].map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 border-b border-slate-100 text-base font-medium transition-colors ${
                    active ? "text-navy-900" : "text-slate-700 hover:text-navy-900"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-transparent"}`} />
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
