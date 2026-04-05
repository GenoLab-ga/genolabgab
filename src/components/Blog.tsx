import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    tag: "NGS & Génomique",
    title: "Séquençage NGS : Comment bien pré-traiter vos données génomiques ?",
    excerpt: "Découvrez les étapes clés du pré-traitement des données NGS : contrôle qualité FastQC, trimming Trimmomatic et alignement BWA.",
    date: "15 Jan 2025",
    readTime: "6 min",
    author: "Karl Mounguele",
    slug: "/blog/pretraitement-donnees-ngs",
  },
  {
    tag: "Analyse bioinformatique",
    title: "Détection de variants génétiques : SNPs, Indels et CNV — Guide complet",
    excerpt: "Comment détecter et interpréter les variants génétiques (SNPs, indels, CNV) à partir de données NGS ? Méthodologie complète.",
    date: "28 Fév 2025",
    readTime: "7 min",
    author: "Karl Mounguele",
    slug: "/blog/detection-variants-snp-indel-cnv",
  },
  {
    tag: "Bioinformatique structurale",
    title: "Docking moléculaire : criblage virtuel de molécules naturelles contre des cibles protéiques",
    excerpt: "Introduction au docking moléculaire avec AutoDock Vina : méthodologie, préparation des ligands et interprétation des scores.",
    date: "10 Mar 2025",
    readTime: "8 min",
    author: "Karl Mounguele",
    slug: "/blog/docking-moleculaire-criblage-virtuel",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-28 md:py-36 border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-4">
            Publications
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Articles & Ressources
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={article.slug}
              className="group block rounded-xl border border-border/60 bg-card/20 overflow-hidden hover:border-primary/40 transition-colors duration-200"
            >
              <div className="p-8">
                <span className="font-heading text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {article.tag}
                </span>
                <h3 className="font-heading text-lg font-semibold mt-4 mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-[1.8] mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
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
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
