import { Dna } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <a href="#accueil" className="flex items-center gap-2 mb-3">
              <Dna className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold text-foreground">
                Geno<span className="text-primary">Lab</span>Gab
              </span>
            </a>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Analyse génomique au service de la santé.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "Services", href: "#services" },
                { label: "À propos", href: "#apropos" },
                { label: "Contact", href: "#contact" },
                { label: "Mentions légales", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-foreground">Contact</h4>
            <a
              href="mailto:genolabgab@proton.me"
              className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              genolabgab@proton.me
            </a>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
