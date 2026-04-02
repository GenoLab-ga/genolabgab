import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const stats = [
  { value: 100, suffix: "+", label: "Analyses réalisées" },
  { value: 3, suffix: "", label: "Domaines d'expertise" },
  { value: 48, suffix: "h", label: "Résultats livrés" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1500;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading text-3xl md:text-4xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

const DNAHelix = () => (
  <svg
    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] w-[600px] h-[800px] hidden lg:block"
    viewBox="0 0 200 400"
    fill="none"
  >
    {Array.from({ length: 20 }).map((_, i) => {
      const y = i * 20;
      const x1 = 60 + Math.sin(i * 0.6) * 40;
      const x2 = 140 - Math.sin(i * 0.6) * 40;
      return (
        <g key={i}>
          <circle cx={x1} cy={y} r="3" fill="hsl(166, 100%, 39%)" opacity={0.6 + Math.sin(i) * 0.4} />
          <circle cx={x2} cy={y} r="3" fill="hsl(216, 100%, 61%)" opacity={0.6 + Math.cos(i) * 0.4} />
          {i % 2 === 0 && (
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(166, 100%, 39%)" strokeWidth="0.5" opacity="0.3" />
          )}
        </g>
      );
    })}
  </svg>
);

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      <DNAHelix />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-heading text-xs font-semibold tracking-widest uppercase text-primary mb-6 border border-primary/30 rounded-full px-4 py-1.5">
              Bioinformatique & Génomique
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            Analyse Génomique{" "}
            <span className="text-gradient">au Service</span>{" "}
            de la Santé
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Solutions bioinformatiques précises, rapides et adaptées aux besoins des centres hospitaliers et de recherche.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="rounded-full font-heading text-sm px-8 glow-teal group">
              <a href="#services">
                Découvrir nos services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full font-heading text-sm px-8 border-border hover:border-primary/50">
              <a href="#contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Prendre contact
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="font-heading text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
