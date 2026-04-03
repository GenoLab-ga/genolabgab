import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const articles = [
  {
    tag: "NGS & Génomique",
    title: "Séquençage NGS : Comment bien pré-traiter vos données génomiques ?",
    excerpt: "Découvrez les étapes clés du pré-traitement des données NGS : contrôle qualité FastQC, trimming Trimmomatic et alignement BWA.",
    date: "15 Jan 2025",
    readTime: "6 min",
    slug: "/blog/pretraitement-donnees-ngs",
  },
  {
    tag: "Analyse bioinformatique",
    title: "Détection de variants génétiques : SNPs, Indels et CNV — Guide complet",
    excerpt: "Comment détecter et interpréter les variants génétiques (SNPs, indels, CNV) à partir de données NGS ? Méthodologie complète.",
    date: "28 Fév 2025",
    readTime: "7 min",
    slug: "/blog/detection-variants-snp-indel-cnv",
  },
  {
    tag: "Bioinformatique structurale",
    title: "Docking moléculaire : criblage virtuel de molécules naturelles contre des cibles protéiques",
    excerpt: "Introduction au docking moléculaire avec AutoDock Vina : méthodologie, préparation des ligands et interprétation des scores.",
    date: "10 Mar 2025",
    readTime: "8 min",
    slug: "/blog/docking-moleculaire-criblage-virtuel",
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
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={article.slug}
                className="group glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:glow-teal block h-full"
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
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-heading">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
