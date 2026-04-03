import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface BlogArticleLayoutProps {
  title: string;
  metaDescription: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  children: React.ReactNode;
}

const BlogArticleLayout = ({
  title,
  metaDescription,
  category,
  readTime,
  date,
  tags,
  children,
}: BlogArticleLayoutProps) => {
  useEffect(() => {
    document.title = `${title} | GenoLabGab`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", metaDescription);
    window.scrollTo(0, 0);
  }, [title, metaDescription]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-heading"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux articles
            </Link>

            <span className="inline-block font-heading text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
              {category}
            </span>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8 pb-8 border-b border-border/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                Karl Mounguele
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:font-body prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:font-body prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          >
            {children}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag className="h-4 w-4 text-muted-foreground mt-1" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-heading text-muted-foreground bg-secondary rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="font-heading text-xl font-bold text-primary">K</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">Karl Mounguele</p>
                <p className="font-body text-sm text-muted-foreground">
                  Fondateur, Biotechnologiste & Bioinformaticien — GenoLabGab
                </p>
              </div>
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticleLayout;
