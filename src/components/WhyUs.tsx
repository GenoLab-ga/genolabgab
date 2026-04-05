import { Target, Zap, BarChart3, Shield } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const reasons = [
  {
    icon: Target,
    title: "Précision scientifique",
    description: "Pipelines validés et reproductibles, conformes aux standards internationaux.",
  },
  {
    icon: Zap,
    title: "Rapidité",
    description: "Résultats livrés sous 48 à 72h grâce à des workflows optimisés.",
  },
  {
    icon: BarChart3,
    title: "Rapports clairs",
    description: "Interprétation accessible aux non-spécialistes, visualisations professionnelles.",
  },
  {
    icon: Shield,
    title: "Confidentialité",
    description: "Données protégées, usage éthique garanti, conformité RGPD.",
  },
];

const WhyUs = () => {
  return (
    <section className="py-28 md:py-36 border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="mb-20 text-center">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-4">
            Nos engagements
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Pourquoi GenoLabGab ?
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-[1.8] mt-6 max-w-[700px] mx-auto">
            Une approche rigoureuse, rapide et confidentielle pour chaque projet génomique.
          </p>
        </ScrollFadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <ScrollFadeIn key={reason.title} delay={i * 0.1} className="text-center">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <reason.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">{reason.title}</h3>
                <p className="font-body text-muted-foreground leading-[1.8]">{reason.description}</p>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
