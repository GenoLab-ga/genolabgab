import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center sm:px-6 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Bioinformatique · Génomique computationnelle
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-navy-900 sm:text-5xl lg:text-6xl">
          Keny Karl Mounguele
        </h1>
        <p className="mt-3 text-xl text-slate-700 sm:text-2xl">
          Ingénieur biotechnologue et bioinformaticien
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Fondateur de GenoLabGab. Pipelines NGS reproductibles, criblage virtuel de composés bioactifs
          et conception de vaccins par vaccinomique inverse, avec un ancrage sur les maladies
          infectieuses d&apos;Afrique centrale.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/research"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-md bg-navy-700 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-800"
          >
            Mes recherches
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-navy-900 transition-colors duration-150 hover:border-navy-700"
          >
            Me contacter
          </Link>
        </div>

        <figure className="mt-10 w-full">
          <div className="relative mx-auto aspect-[16/8] w-full overflow-hidden rounded-sm border border-rule bg-navy-950">
            <Image
              src="/images/hero-bg.webp"
              alt="Complexe protéine-ligand obtenu par criblage virtuel, visualisé avec PyMOL"
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-slate-500">
            Fig. Complexe protéine-ligand issu d&apos;un criblage virtuel (PyMOL).
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
