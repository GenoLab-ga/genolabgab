import { Target, Zap, BarChart3, Shield } from "lucide-react";

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
        <div className="mb-20">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-4">
            Nos engagements
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Pourquoi GenoLabGab ?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">{reason.title}</h3>
              <p className="font-body text-muted-foreground leading-[1.8]">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
