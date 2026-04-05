import { Dna } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="/#accueil" className="flex items-center gap-2 mb-4">
              <Dna className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-bold text-foreground">
                Geno<span className="text-primary">Lab</span>Gab
              </span>
            </a>
            <p className="font-body text-sm text-muted-foreground leading-[1.8]">
              Analyse génomique au service de la santé.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 text-foreground">Liens rapides</h4>
            <ul className="space-y-3">
              {[
                { label: "Accueil", href: "/#accueil" },
                { label: "À propos", href: "/#apropos" },
                { label: "Blog", href: "/#blog" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 text-foreground">Services</h4>
            <ul className="space-y-3">
              {[
                "Séquençage & pré-traitement",
                "Analyse bioinformatique",
                "Visualisation & rapports",
                "Consulting",
              ].map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:genolabgab@proton.me" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  genolabgab@proton.me
                </a>
              </li>
              <li>
                <span className="font-body text-sm text-muted-foreground">Basé au Maroc</span>
              </li>
              <li>
                <span className="font-body text-sm text-muted-foreground">Disponible à l'international</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2025 GenoLabGab — Tous droits réservés.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Karl Mounguele — Fondateur, Biotechnologiste & Bioinformaticien
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
