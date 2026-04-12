import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  useEffect(() => {
    document.title = "Politique de confidentialité | GenoLabGab";
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

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Politique de confidentialité</h1>
          <p className="text-muted-foreground text-sm mb-12">Dernière mise à jour : Avril 2026</p>

          <div className="prose-custom space-y-8">
            <Section title="1. Responsable du traitement">
              <p>Le responsable du traitement des données personnelles collectées sur genolabgab.com est GenoLabGab, opéré par Keny Karl Mounguele, Biotechnologiste & Bioinformaticien.</p>
            </Section>

            <Section title="2. Données collectées">
              <p>Nous collectons uniquement les données que vous nous fournissez volontairement via le formulaire de contact :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Objet du message</li>
                <li>Contenu du message</li>
              </ul>
              <p>Aucune donnée n'est collectée automatiquement à des fins de profilage ou de tracking publicitaire.</p>
            </Section>

            <Section title="3. Finalités du traitement">
              <p>Les données collectées sont utilisées exclusivement pour :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Répondre à vos demandes de contact et de devis</li>
                <li>Assurer le suivi des prestations de services</li>
                <li>Communiquer des informations relatives à nos services</li>
              </ul>
            </Section>

            <Section title="4. Base légale du traitement">
              <p>Le traitement de vos données repose sur votre consentement explicite, donné lors de la soumission du formulaire de contact, ainsi que sur l'intérêt légitime de GenoLabGab à répondre à vos demandes.</p>
            </Section>

            <Section title="5. Destinataires des données">
              <p>Vos données personnelles sont traitées via le service Formspree pour la gestion des formulaires de contact. Aucune donnée n'est vendue, louée ou partagée avec des tiers à des fins commerciales.</p>
            </Section>

            <Section title="6. Durée de conservation">
              <p>Les données collectées via le formulaire de contact sont conservées pendant une durée maximale de 12 mois à compter de la dernière interaction, sauf obligation légale contraire.</p>
            </Section>

            <Section title="7. Vos droits">
              <p>Conformément à la réglementation applicable en matière de protection des données, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Droit d'accès</strong> : obtenir la confirmation du traitement de vos données et en recevoir une copie</li>
                <li><strong className="text-foreground">Droit de rectification</strong> : demander la correction de données inexactes</li>
                <li><strong className="text-foreground">Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li><strong className="text-foreground">Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong className="text-foreground">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              </ul>
              <p>Pour exercer ces droits, contactez-nous via le <Link to="/#contact" className="text-primary hover:underline">formulaire de contact</Link>.</p>
            </Section>

            <Section title="8. Cookies">
              <p>Le site genolabgab.com n'utilise pas de cookies de tracking ou publicitaires. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.</p>
            </Section>

            <Section title="9. Sécurité des données">
              <p>GenoLabGab met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, toute modification, divulgation ou destruction.</p>
            </Section>

            <Section title="10. Modifications de la politique">
              <p>Cette politique de confidentialité peut être mise à jour à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour révisée.</p>
            </Section>

            <Section title="11. Contact">
              <p>Pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter via le <Link to="/#contact" className="text-primary hover:underline">formulaire de contact</Link> du site.</p>
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

export default Privacy;
