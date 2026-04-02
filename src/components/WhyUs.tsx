import { motion } from "framer-motion";
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
    <section className="py-24 md:py-32 relative">
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
            Nos engagements
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Pourquoi <span className="text-gradient">GenoLabGab</span> ?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 glass rounded-2xl hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <reason.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">{reason.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
