import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "100+", label: "Analyses réalisées", detail: "NGS, variants, docking" },
  { value: "3", label: "Domaines d'expertise", detail: "Génomique, Structurale, Métagénomique" },
  { value: "48h", label: "Délai de livraison", detail: "Résultats rapides et fiables" },
];

const DNABackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 201, 167, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 201, 167, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const DNAHelix = () => (
  <svg viewBox="0 0 300 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* DNA double helix */}
    {Array.from({ length: 20 }).map((_, i) => {
      const y = i * 20;
      const x1 = 150 + Math.sin((i * Math.PI) / 5) * 80;
      const x2 = 150 - Math.sin((i * Math.PI) / 5) * 80;
      const opacity = 0.15 + Math.abs(Math.sin((i * Math.PI) / 5)) * 0.4;
      return (
        <g key={i}>
          <circle cx={x1} cy={y} r={4} fill="hsl(166, 100%, 39%)" opacity={opacity} />
          <circle cx={x2} cy={y} r={4} fill="hsl(216, 100%, 61%)" opacity={opacity} />
          {i % 2 === 0 && (
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(166, 100%, 39%)" strokeWidth={1} opacity={0.15} />
          )}
        </g>
      );
    })}
    {/* Strand paths */}
    <path
      d={`M ${150 + Math.sin(0) * 80} 0 ${Array.from({ length: 20 }).map((_, i) => `L ${150 + Math.sin((i * Math.PI) / 5) * 80} ${i * 20}`).join(" ")}`}
      stroke="hsl(166, 100%, 39%)"
      strokeWidth={1.5}
      opacity={0.3}
      fill="none"
    />
    <path
      d={`M ${150 - Math.sin(0) * 80} 0 ${Array.from({ length: 20 }).map((_, i) => `L ${150 - Math.sin((i * Math.PI) / 5) * 80} ${i * 20}`).join(" ")}`}
      stroke="hsl(216, 100%, 61%)"
      strokeWidth={1.5}
      opacity={0.3}
      fill="none"
    />
    {/* Floating data points */}
    {[
      { cx: 60, cy: 80, r: 2 },
      { cx: 240, cy: 120, r: 3 },
      { cx: 40, cy: 250, r: 2 },
      { cx: 260, cy: 300, r: 2 },
      { cx: 80, cy: 350, r: 3 },
    ].map((dot, i) => (
      <circle key={`dot-${i}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill="hsl(166, 100%, 39%)" opacity={0.2}>
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${3 + i}s`} repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <DNABackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-sm tracking-widest uppercase text-primary mb-6"
            >
              Bioinformatique & Génomique
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.12] mb-8 text-foreground"
            >
              Analyse génomique au service de la santé
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-lg md:text-xl text-muted-foreground mb-12 leading-[1.8] max-w-xl mx-auto lg:mx-0"
            >
              Solutions bioinformatiques précises, rapides et adaptées aux besoins des centres hospitaliers et de recherche.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-md font-heading text-sm px-8">
                <a href="#contact">Prendre contact</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md font-heading text-sm px-8">
                <a href="#services" className="flex items-center gap-2">
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[320px] h-[400px] animate-float">
              <DNAHelix />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card/50 border border-border/40 rounded-lg p-6 text-center border-t-2 border-t-primary"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="font-heading text-xs text-foreground mt-2">{stat.label}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{stat.detail}</p>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-14 text-center">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />
            <p className="font-body text-sm text-muted-foreground">
              Analyses réalisées pour des laboratoires de recherche au Maroc et en Afrique
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
