import Image from "next/image";
import Link from "next/link";
import ScrambleTitle from "@/components/lab/ScrambleTitle";
import Terminal from "@/components/lab/Terminal";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-slate-950">
    {/* Image de fond — UNIQUEMENT sur cette bande */}
    <Image
    src="/images/hero-bg.webp"
    alt="Complexe protéine-ligand - criblage virtuel GenoLabGab (PyMOL)"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center opacity-60"
    />

    {/* Overlay de lisibilité (texte toujours lisible) */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/80" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_70%)]" />

    {/* Contenu */}
    <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
    <div>
    <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-bio-500/30 bg-slate-950/60 px-4 py-1.5 font-mono text-xs text-bio-300 backdrop-blur-sm">
    <span className="relative flex h-2 w-2">
    <span className="absolute h-full w-full motion-safe:animate-ping rounded-full bg-bio-400 opacity-60" />
    <span className="relative h-2 w-2 rounded-full bg-bio-400" />
    </span>
    Disponible pour une collaboration
    </p>

    <ScrambleTitle text="Keny Karl Mounguele" />

    <p className="mt-4 font-mono text-lg text-bio-400">Ingénieur biotechnologue et bioinformaticien</p>

    <p className="mt-6 max-w-xl leading-7 text-slate-300">
    Fondateur de GenoLabGab - pipelines NGS automatisés, criblage virtuel
    de composés bioactifs et conception de vaccins par vaccinomique inverse.
    </p>

    <div className="mt-10 flex flex-wrap gap-4">
    <Link
    href="/research"
    className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-bio-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-bio-400 hover:shadow-lg hover:shadow-bio-500/25"
    >
    Mes recherches
    </Link>
    <Link
    href="/contact"
    className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-bio-500/40 bg-slate-950/40 px-6 font-mono text-sm text-slate-200 backdrop-blur-sm transition hover:border-bio-400 hover:bg-slate-950/60"
    >
    Me contacter
    </Link>
    </div>
    </div>

    <Terminal />
    </div>
    </section>
  );
}
