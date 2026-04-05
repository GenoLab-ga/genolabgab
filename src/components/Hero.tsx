import { Button } from "@/components/ui/button";

const stats = [
  { value: "100+", label: "Analyses réalisées" },
  { value: "3", label: "Domaines d'expertise" },
  { value: "48h", label: "Délai de livraison" },
];

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-6">
            Bioinformatique & Génomique
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-8 text-foreground">
            Analyse génomique au service de la santé
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-[1.8]">
            Solutions bioinformatiques précises, rapides et adaptées aux besoins des centres hospitaliers et de recherche.
          </p>

          <Button asChild size="lg" className="rounded-md font-heading text-sm px-8">
            <a href="#contact">Prendre contact</a>
          </Button>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-8 max-w-xl border-t border-border/40 pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="font-heading text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
