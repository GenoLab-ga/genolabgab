import { motion } from "framer-motion";
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
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Nos expertises
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Services <span className="text-gradient">Bioinformatiques</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Des solutions complètes, du séquençage brut à l'interprétation clinique.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group glass rounded-2xl p-8 border-t-2 border-t-primary/60 hover:border-t-primary transition-all duration-300 hover:-translate-y-2 hover:glow-teal"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="font-heading text-xl font-semibold mb-4 text-foreground">
                {service.title}
              </h3>

              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-heading text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center font-heading text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
              >
                En savoir plus
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
