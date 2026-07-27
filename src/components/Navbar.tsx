"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
{ href: "/about", label: "À propos" },
{ href: "/research", label: "Recherche" },
{ href: "/publications", label: "Publications" },
{ href: "/projects", label: "Projets" },
{ href: "/cv", label: "CV" },
{ href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isHome = pathname === "/";

  return (
    <header
    className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
      ? "border-b border-slate-200/60 bg-white/90 shadow-sm shadow-slate-100/50 backdrop-blur-xl"
      : "border-b border-transparent bg-transparent"
    }`}
    >
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
    {/* Logo */}
    <Link href="/" className="flex items-center gap-2.5 group">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-200 transition group-hover:shadow-emerald-300">
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M2 9c6.667 6 13.333 0 20 6" />
    <path d="M2 6c3.33-3 6.67-3 10 0s6.67 3 10 0" />
    <path d="M2 18c3.33 3 6.67 3 10 0s6.67-3 10 0" />
    </svg>
    </div>
    <span className={`text-lg font-bold tracking-tight ${scrolled || !isHome ? "text-slate-900" : "text-slate-900"}`}>
    GenoLab<span className="text-emerald-600">Gab</span>
    </span>
    </Link>

    {/* Desktop nav */}
    <ul className="hidden items-center gap-1 lg:flex">
    {navLinks.map((l) => {
      const active = pathname === l.href;
      return (
        <li key={l.href}>
        <Link
        href={l.href}
        className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
          active
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
        >
        {l.label}
        {active && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-emerald-500" />
        )}
        </Link>
        </li>
      );
    })}
    </ul>

    {/* Mobile menu button */}
    <button
    className={`flex items-center justify-center rounded-lg p-2.5 transition md:hidden ${
      scrolled ? "text-slate-700 hover:bg-slate-100" : "text-slate-700 hover:bg-slate-100"
    }`}
    onClick={() => setOpen(!open)}
    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
    aria-expanded={open}
    >
    <div className="relative h-5 w-5">
    <span
    className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
      open ? "top-2 rotate-45" : "top-0"
    }`}
    />
    <span
    className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ${
      open ? "opacity-0 scale-0" : "opacity-100"
    }`}
    />
    <span
    className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
      open ? "top-2 -rotate-45" : "top-4"
    }`}
    />
    </div>
    </button>
    </nav>

    {/* Mobile menu overlay */}
    <div
    className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
      open ? "opacity-100" : "pointer-events-none opacity-0"
    }`}
    onClick={() => setOpen(false)}
    aria-hidden="true"
    />

    {/* Mobile menu panel */}
    <div
    className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
    >
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
    <span className="text-lg font-bold text-slate-900">
    GenoLab<span className="text-emerald-600">Gab</span>
    </span>
    <button
    onClick={() => setOpen(false)}
    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    aria-label="Fermer"
    >
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    </button>
    </div>
    <nav className="px-4 py-5">
    <ul className="flex flex-col gap-1">
    {navLinks.map((l) => {
      const active = pathname === l.href;
      return (
        <li key={l.href}>
        <Link
        href={l.href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
          active
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
        >
        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        )}
        {l.label}
        </Link>
        </li>
      );
    })}
    </ul>
    </nav>
    </div>
    </header>
  );
}
