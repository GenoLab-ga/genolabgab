import { Dna, BrainCircuit, BarChart3, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Dna,
    title: "Séquençage et pré-traitement des données",
    description:
      "Extraction, nettoyage et mise en forme des données issues de plateformes NGS (Illumina, Oxford Nanopore). Contrôle qualité FastQC, trimming Trimmomatic, alignement BWA/STAR.",
    tags: ["FastQC", "Trimmomatic", "BWA", "STAR", "NGS"],
  },
  {
    icon: BrainCircuit,
    title: "Analyse bioinformatique avancée",
    description:
      "Alignement, annotation, détection de variants (SNPs, indels, CNV), études de diversité génétique et métagénomique. Pipelines Snakemake/Nextflow sur mesure.",
    tags: ["Snakemake", "Nextflow", "Variants", "Métagénomique"],
  },
  {
    icon: BarChart3,
    title: "Visualisation et rapports scientifiques",
    description:
      "Création de rapports automatisés, visualisations R/Python (ggplot2, matplotlib), interprétation de résultats pour professionnels de santé et chercheurs.",
    tags: ["R", "Python", "ggplot2", "matplotlib"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 md:py-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-4">
            Nos expertises
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Services bioinformatiques
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-border/60 bg-card/30 p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <service.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-heading text-xl font-semibold mb-4 text-foreground">
                {service.title}
              </h3>

              <p className="font-body text-muted-foreground leading-[1.8] mb-6 flex-1">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-heading text-[10px] font-medium uppercase tracking-wider text-muted-foreground border border-border/60 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center font-heading text-sm text-primary hover:text-primary/80 transition-colors"
              >
                En savoir plus
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
