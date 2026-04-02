import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    tag: "Génomique",
    title: "Introduction au séquençage de nouvelle génération (NGS)",
    excerpt: "Comprendre les technologies Illumina et Oxford Nanopore pour l'analyse génomique clinique.",
    date: "15 Jan 2025",
  },
  {
    tag: "Docking moléculaire",
    title: "AutoDock Vina : principes et applications en drug discovery",
    excerpt: "Comment le docking moléculaire accélère la découverte de nouveaux médicaments.",
    date: "28 Fév 2025",
  },
  {
    tag: "NGS",
    title: "Pipelines bioinformatiques reproductibles avec Snakemake",
    excerpt: "Construire des workflows automatisés et reproductibles pour l'analyse de données NGS.",
    date: "10 Mar 2025",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Ressources
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Actualités & <span className="text-gradient">Publications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:glow-teal"
            >
              <div className="h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-primary">G</span>
                </div>
              </div>
              <div className="p-6">
                <span className="font-heading text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1">
                  {article.tag}
                </span>
                <h3 className="font-heading text-lg font-semibold mt-4 mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-muted-foreground font-heading">
                  <Calendar className="h-3 w-3 mr-1" />
                  {article.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="rounded-full font-heading text-sm border-primary/30 hover:border-primary/60 group">
            Voir tous les articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
