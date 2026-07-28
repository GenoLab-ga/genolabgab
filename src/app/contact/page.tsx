"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("envoi");

    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xpqoyoyj", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setStatus("succes");
      form.reset();
    } else {
      setStatus("erreur");
    }
  }

  return (
    <div className="relative overflow-hidden">
    {/* Background décoratif */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />
    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-[100px]" />
    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-[100px]" />

    <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
    {/* En-tête */}
    <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">Parlons-en</p>
    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
    Me contacter
    </h1>
    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
    Une question sur un projet de recherche, une collaboration scientifique, ou une demande d&apos;analyse bioinformatique ? Je vous réponds rapidement.
    </p>
    </div>

    {/* Grille principale */}
    <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">

    {/* ── Colonne gauche : Informations ── */}
    <div className="flex flex-col gap-6">
    {/* Email */}
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
    <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
    </div>
    <div>
    <h3 className="text-sm font-bold text-slate-900">Email</h3>
    <a href="mailto:genolabgab@proton.me" className="mt-1 block text-sm text-slate-500 transition hover:text-emerald-600">
    genolabgab@proton.me
    </a>
    <p className="mt-1 text-xs text-slate-400">Réponse sous 24-48h en moyenne</p>
    </div>
    </div>
    </div>

    {/* Localisation */}
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
    <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
    </svg>
    </div>
    <div>
    <h3 className="text-sm font-bold text-slate-900">Localisation</h3>
    <p className="mt-1 text-sm text-slate-500">Université Euromed de Fès</p>
    <p className="text-xs text-slate-400">Fès, Maroc</p>
    </div>
    </div>
    </div>

    {/* Disponibilité */}
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
    <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    </svg>
    </div>
    <div>
    <h3 className="text-sm font-bold text-slate-900">Disponibilité</h3>
    <div className="mt-1 flex items-center gap-2">
    <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
    <span className="text-sm text-emerald-600 font-medium">Actuellement disponible</span>
    </div>
    <p className="mt-1 text-xs text-slate-400">Ouvert aux collaborations et discussions scientifiques</p>
    </div>
    </div>
    </div>

    {/* Réseaux sociaux */}
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
    <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
    </div>
    <div>
    <h3 className="text-sm font-bold text-slate-900">Réseaux</h3>
    <div className="mt-2 flex gap-3">
    <a
    href="https://github.com/GenoLab-ga"
    target="_blank"
    rel="noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
    aria-label="GitHub"
    >
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
    </a>
    <a
    href="https://linkedin.com/in/karl-mounguele"
    target="_blank"
    rel="noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
    aria-label="LinkedIn"
    >
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
    </a>
    <a
    href="https://orcid.org/0009-0006-6706-0069"
    target="_blank"
    rel="noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
    aria-label="ORCID"
    >
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.484 3.872-3.722 0-2.016-1.284-3.722-3.828-3.722h-2.341z" />
    </svg>
    </a>
    </div>
    </div>
    </div>
    </div>
    </div>

    {/* ── Colonne droite : Formulaire ── */}
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10">
    <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-900">Envoyer un message</h2>
    <p className="mt-1 text-sm text-slate-500">Tous les champs sont requis.</p>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    {/* Honeypot anti-spam */}
    <input
    type="text"
    name="_gotcha"
    style={{ display: "none" }}
    tabIndex={-1}
    autoComplete="off"
    />

    <div>
    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
    Nom complet
    </label>
    <input
    type="text"
    id="name"
    name="name"
    required
    placeholder="Votre nom"
    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
    />
    </div>

    <div>
    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
    Adresse email
    </label>
    <input
    type="email"
    id="email"
    name="email"
    required
    placeholder="votre@email.com"
    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
    />
    </div>

    {/* Sujet */}
    <div>
    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
    Sujet
    </label>
    <select
    id="subject"
    name="subject"
    required
    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
    >
    <option value="" disabled selected>Choisissez un sujet</option>
    <option value="collaboration">Collaboration de recherche</option>
    <option value="analyse">Analyse bioinformatique</option>
    <option value="stage">Stage ou encadrement</option>
    <option value="autre">Autre</option>
    </select>
    </div>

    <div>
    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
    Votre message
    </label>
    <textarea
    id="message"
    name="message"
    required
    rows={5}
    placeholder="Décrivez votre projet ou posez votre question..."
    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 resize-y"
    />
    </div>

    <button
    type="submit"
    disabled={status === "envoi"}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed w-full"
    >
    {status === "envoi" ? (
      <>
      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Envoi en cours...
      </>
    ) : (
      <>
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Envoyer le message
      </>
    )}
    </button>
    </form>

    {/* Message de succès */}
    {status === "succes" && (
      <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
      <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
      </svg>
      </div>
      <p className="text-sm font-semibold text-emerald-700">Message envoyé avec succès !</p>
      <p className="mt-1 text-xs text-emerald-600">Merci, je vous répondrai dans les plus brefs délais.</p>
      </div>
    )}

    {/* Message d'erreur */}
    {status === "erreur" && (
      <div className="mt-5 rounded-xl bg-red-50 p-4 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
      <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
      </div>
      <p className="text-sm font-semibold text-red-700">Oups, une erreur est survenue.</p>
      <p className="mt-1 text-xs text-red-600">Veuillez réessayer ou m&apos;envoyer un email directement.</p>
      </div>
    )}
    </div>
    </div>
    </div>
    </div>
  );
}
