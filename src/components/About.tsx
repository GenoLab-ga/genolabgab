import { motion } from "framer-motion";
import { Linkedin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const skills = [
  "AutoDock Vina",
  "GROMACS",
  "Python",
  "R",
  "Snakemake",
  "NGS Analysis",
  "Molecular Docking",
  "PyMOL",
];

const About = () => {
  return (
    <section id="apropos" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-primary/30 ring-offset-4 ring-offset-background">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-heading text-5xl md:text-6xl font-bold text-gradient">KM</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-teal-strong animate-pulse-glow">
                <span className="font-heading text-xs font-bold text-primary-foreground">PhD</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-heading text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
              À propos du fondateur
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Karl <span className="text-gradient">Mounguele</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
              Karl Mounguele est ingénieur biotechnologiste et bioinformaticien, spécialisé en
              bioinformatique structurale et analyse de données génomiques. Fondateur de GenoLabGab,
              il met son expertise au service des professionnels de santé et de la recherche
              scientifique en Afrique et à l'international.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="font-heading text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <Button asChild variant="outline" className="rounded-full font-heading text-sm border-primary/30 hover:border-primary/60 group">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                Voir le profil LinkedIn
                <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
