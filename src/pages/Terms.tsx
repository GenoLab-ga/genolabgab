import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  useEffect(() => {
    document.title = "Conditions d'utilisation | GenoLabGab";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[820px] mx-auto px-6"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            ← Retour à l'accueil
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Conditions d'utilisation</h1>
          <p className="text-muted-foreground text-sm mb-12">Dernière mise à jour : Avril 2026</p>

          <div className="prose-custom space-y-8">
            <Section title="1. Présentation du service">
              <p>GenoLabGab est une plateforme de publication automatisée de contenus en bioinformatique, opérée par Keny Karl Mounguele. Le site propose des articles scientifiques, des analyses génomiques et des services de conseil en bioinformatique.</p>
            </Section>

            <Section title="2. Acceptation des conditions">
              <p>En accédant au site genolabgab.com, vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.</p>
            </Section>

            <Section title="3. Propriété intellectuelle">
              <p>L'ensemble des contenus publiés sur GenoLabGab — articles, analyses, illustrations, code et méthodologies — sont la propriété intellectuelle de GenoLabGab et de leurs auteurs respectifs. Toute reproduction, distribution ou utilisation commerciale sans autorisation écrite préalable est strictement interdite.</p>
              <p>Les citations courtes à des fins académiques sont autorisées sous réserve de mention de la source complète.</p>
            </Section>

            <Section title="4. Utilisation du contenu scientifique">
              <p>Les informations publiées sur GenoLabGab sont fournies à titre informatif et éducatif. Elles ne constituent en aucun cas un avis médical, un diagnostic ou une recommandation thérapeutique. Les résultats d'analyses bioinformatiques présentés sont des résultats computationnels qui nécessitent une validation expérimentale.</p>
            </Section>

            <Section title="5. Services et prestations">
              <p>GenoLabGab propose des services d'analyse bioinformatique incluant le prétraitement de données NGS, la détection de variants, le docking moléculaire et le criblage virtuel. Les conditions spécifiques de chaque prestation sont définies dans un devis ou contrat séparé.</p>
              <p>GenoLabGab se réserve le droit de refuser une demande de prestation sans justification.</p>
            </Section>

            <Section title="6. Limitation de responsabilité">
              <p>GenoLabGab s'efforce de fournir des informations exactes et à jour, mais ne garantit pas l'exhaustivité, l'exactitude ou la pertinence des contenus publiés. GenoLabGab ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l'utilisation des informations ou services du site.</p>
            </Section>

            <Section title="7. Protection des données">
              <p>Le traitement des données personnelles est décrit dans notre <Link to="/privacy" className="text-primary hover:underline">Politique de confidentialité</Link>. En utilisant le formulaire de contact, vous consentez au traitement de vos données conformément à cette politique.</p>
            </Section>

            <Section title="8. Modifications des conditions">
              <p>GenoLabGab se réserve le droit de modifier les présentes conditions à tout moment. Les modifications prennent effet dès leur publication sur le site. Il est recommandé de consulter régulièrement cette page.</p>
            </Section>

            <Section title="9. Droit applicable">
              <p>Les présentes conditions sont régies par le droit en vigueur. En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire.</p>
            </Section>

            <Section title="10. Contact">
              <p>Pour toute question relative aux présentes conditions, vous pouvez nous contacter via le <Link to="/#contact" className="text-primary hover:underline">formulaire de contact</Link> du site.</p>
            </Section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="font-heading text-xl font-semibold text-foreground mb-3 border-l-4 border-primary pl-4">{title}</h2>
    <div className="text-muted-foreground leading-[1.9] space-y-4">{children}</div>
  </section>
);

export default Terms;
