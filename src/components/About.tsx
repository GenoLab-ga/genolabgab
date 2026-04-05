import { Badge } from "@/components/ui/badge";
import { Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollFadeIn from "@/components/ScrollFadeIn";

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
    <section id="apropos" className="py-28 md:py-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="mb-20 text-center">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-4">
            À propos du fondateur
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Karl Mounguele
          </h2>
        </ScrollFadeIn>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollFadeIn className="flex justify-center">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-card border border-border/60 flex items-center justify-center">
              <span className="font-heading text-5xl md:text-6xl font-bold text-primary">KM</span>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.15}>
            <p className="font-body text-lg text-muted-foreground leading-[1.8] mb-8">
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
                  className="font-heading text-xs border-border/60 text-muted-foreground"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <Button asChild variant="outline" className="rounded-md font-heading text-sm border-border/60">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                Voir le profil LinkedIn
                <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
              </a>
            </Button>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
