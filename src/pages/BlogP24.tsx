import BlogArticleLayout from "@/components/BlogArticleLayout";

const BlogP24 = () => (
  <BlogArticleLayout
    title="Criblage virtuel de produits naturels contre la protéine de capside p24 du VIH-1"
    metaDescription="Criblage virtuel par docking moléculaire AutoDock Vina de 100 produits naturels contre la capside p24 du VIH-1 (PDB : 4XFX). Identification d'un triterpénoïde oléanane avec un score de -8,99 kcal/mol."
    category="Bioinformatique structurale"
    readTime="8 min"
    date="Avril 2026"
    tags={["docking moléculaire", "VIH-1", "capside p24", "AutoDock Vina", "produits naturels", "criblage virtuel", "ADMET", "triterpénoïde", "bioinformatique structurale"]}
  >
    <h2>Résumé</h2>
    <p>
      La protéine de capside p24 du VIH-1 constitue une cible thérapeutique prometteuse en raison de son rôle essentiel dans l'assemblage et la maturation virale. Dans cette étude, un criblage virtuel par docking moléculaire a été réalisé sur la structure cristallographique de la p24 (PDB : 4XFX) contre une bibliothèque de 100 produits naturels issus de la base de données ZINC Natural Products. Le meilleur hit identifié est le composé CNP0013909.3, un triterpénoïde oléanane, avec une énergie libre de liaison de <strong>-8,99 kcal/mol</strong>.
    </p>

    <h2>1. Introduction</h2>

    <h3>Le VIH-1 et les enjeux thérapeutiques</h3>
    <p>
      Le Virus de l'Immunodéficience Humaine de type 1 (VIH-1) est l'agent étiologique du Syndrome d'Immunodéficience Acquise (SIDA). Malgré les avancées significatives des thérapies antirétrovirales (ARV), le VIH-1 demeure un problème de santé publique mondial majeur avec environ 39 millions de personnes vivant avec le virus en 2023 (ONUSIDA, 2023).
    </p>

    <h3>La protéine de capside p24 comme cible thérapeutique</h3>
    <p>
      La protéine de capside p24 est une composante structurale essentielle du VIH-1. Elle assure l'assemblage du cœur viral conique qui protège l'ARN génomique et les enzymes virales. La structure cristallographique 4XFX (résolution : 2,0 Å) constitue une base solide pour le criblage virtuel, en raison de la conservation élevée de ce site chez les différentes souches du VIH-1.
    </p>

    <h3>Les produits naturels comme source de molécules antivirales</h3>
    <p>
      Les produits naturels représentent une source privilégiée de molécules bioactives avec une diversité structurale remarquable. La classe des triterpénoïdes oléananes a fait l'objet de nombreuses études démontrant leur activité inhibitrice sur la réplication virale du VIH-1.
    </p>

    <h2>2. Matériels et Méthodes</h2>

    <h3>Préparation de la protéine cible</h3>
    <p>
      La structure 3D de la p24 (PDB : 4XFX) a été téléchargée depuis la Protein Data Bank. Le fichier PDBQT a été préparé par suppression des molécules d'eau, ajout des hydrogènes manquants et attribution des charges Gasteiger via AutoDockTools.
    </p>

    <h3>Préparation de la bibliothèque de ligands</h3>
    <p>
      100 produits naturels issus de ZINC Natural Products ont été convertis du format SDF au format PDBQT via Open Babel avec ajout des hydrogènes et calcul des charges partielles de Gasteiger.
    </p>

    <h3>Paramètres de docking AutoDock Vina</h3>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-3 px-4 font-heading text-foreground">Paramètre</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Valeur</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/30"><td className="py-2 px-4">Centre X, Y, Z (Å)</td><td className="py-2 px-4">9,2 ; -23,2 ; 0,0</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Taille de la grille</td><td className="py-2 px-4">80 × 80 × 80 Å</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Exhaustiveness</td><td className="py-2 px-4">8</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Nombre de modes</td><td className="py-2 px-4">9</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Energy range</td><td className="py-2 px-4">3 kcal/mol</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">CPUs utilisés</td><td className="py-2 px-4">8</td></tr>
        </tbody>
      </table>
    </div>
    <p>
      Un blind docking a été réalisé afin d'explorer l'ensemble de la surface protéique sans a priori sur le site de liaison.
    </p>

    <h2>3. Résultats</h2>

    <h3>Top 10 des meilleurs hits</h3>
    <p>
      Sur 100 molécules criblées, 21 (21,2%) atteignent le seuil de sélection ≤ -7,0 kcal/mol. Voici le top 10 :
    </p>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-3 px-4 font-heading text-foreground">Rang</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Ligand</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Score (kcal/mol)</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Statut</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/30 bg-primary/5"><td className="py-2 px-4 font-semibold text-foreground">1</td><td className="py-2 px-4 font-semibold text-foreground">CNP0013909.3 (ligand_2)</td><td className="py-2 px-4 font-semibold text-primary">-8,99</td><td className="py-2 px-4 font-semibold text-primary">Meilleur hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">2</td><td className="py-2 px-4">ligand_72</td><td className="py-2 px-4">-8,23</td><td className="py-2 px-4">Hit majeur</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">3</td><td className="py-2 px-4">ligand_58</td><td className="py-2 px-4">-8,13</td><td className="py-2 px-4">Hit majeur</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">4</td><td className="py-2 px-4">ligand_70</td><td className="py-2 px-4">-8,03</td><td className="py-2 px-4">Hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">5</td><td className="py-2 px-4">ligand_71</td><td className="py-2 px-4">-7,78</td><td className="py-2 px-4">Hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">6</td><td className="py-2 px-4">ligand_61</td><td className="py-2 px-4">-7,69</td><td className="py-2 px-4">Hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">7</td><td className="py-2 px-4">ligand_74</td><td className="py-2 px-4">-7,58</td><td className="py-2 px-4">Hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">8</td><td className="py-2 px-4">ligand_87</td><td className="py-2 px-4">-7,54</td><td className="py-2 px-4">Hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">9</td><td className="py-2 px-4">ligand_38</td><td className="py-2 px-4">-7,43</td><td className="py-2 px-4">Hit</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">10</td><td className="py-2 px-4">ligand_1</td><td className="py-2 px-4">-7,43</td><td className="py-2 px-4">Hit</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Identification du meilleur hit — CNP0013909.3</h3>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-3 px-4 font-heading text-foreground">Propriété</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Valeur</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/30"><td className="py-2 px-4">ID COCONUT</td><td className="py-2 px-4">CNP0013909.3</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">ID ZINC</td><td className="py-2 px-4">ZINC000150341587</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Formule moléculaire</td><td className="py-2 px-4">C₄₄H₅₇N₃O₄</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Poids moléculaire</td><td className="py-2 px-4">691,94 g/mol</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Classe chimique</td><td className="py-2 px-4">Oléanane triterpénoïde</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Score de docking</td><td className="py-2 px-4 text-primary font-semibold">-8,99 kcal/mol</td></tr>
        </tbody>
      </table>
    </div>

    <h2>4. Analyse ADMET</h2>

    <h3>Propriétés physicochimiques</h3>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-3 px-4 font-heading text-foreground">Descripteur</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Valeur</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Évaluation</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/30"><td className="py-2 px-4">MW (g/mol)</td><td className="py-2 px-4">691,43</td><td className="py-2 px-4">Hors plage (&gt; 600)</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">nHA</td><td className="py-2 px-4">7</td><td className="py-2 px-4">Acceptable (0-12)</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">nHD</td><td className="py-2 px-4">1</td><td className="py-2 px-4">Excellent (0-7)</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">TPSA (Å²)</td><td className="py-2 px-4">97,19</td><td className="py-2 px-4">Acceptable (&lt; 140)</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">logS</td><td className="py-2 px-4">-8,423</td><td className="py-2 px-4">Faible solubilité</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">logP</td><td className="py-2 px-4">8,144</td><td className="py-2 px-4">Très lipophile</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">NPscore</td><td className="py-2 px-4">1,718</td><td className="py-2 px-4">Caractère NP confirmé</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Absorption</h3>
    <p>
      L'absorption intestinale humaine (HIA) atteint 100%, avec une bonne perméabilité Caco-2 (0,76). La molécule est substrat et inhibiteur de la P-glycoprotéine, ce qui représente un risque d'efflux à surveiller lors des étapes d'optimisation.
    </p>

    <h3>Profil de toxicité</h3>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-3 px-4 font-heading text-foreground">Paramètre</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Valeur</th>
            <th className="text-left py-3 px-4 font-heading text-foreground">Évaluation</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/30"><td className="py-2 px-4">Hépatotoxicité DILI</td><td className="py-2 px-4">0,915</td><td className="py-2 px-4 text-red-400">Risque très élevé</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Toxicité respiratoire</td><td className="py-2 px-4">0,921</td><td className="py-2 px-4 text-red-400">Risque très élevé</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Toxicité AMES</td><td className="py-2 px-4">0,087</td><td className="py-2 px-4 text-green-400">Faible mutagénicité</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Toxicité aiguë orale</td><td className="py-2 px-4">0,287</td><td className="py-2 px-4 text-green-400">Faible</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Sensibilisation cutanée</td><td className="py-2 px-4">0,884</td><td className="py-2 px-4 text-red-400">Risque élevé</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 px-4">Carcinogénicité</td><td className="py-2 px-4">0,318</td><td className="py-2 px-4 text-green-400">Faible</td></tr>
        </tbody>
      </table>
    </div>

    <h2>5. Discussion</h2>
    <p>
      Le composé CNP0013909.3 présente un score de docking de <strong>-8,99 kcal/mol</strong>, nettement supérieur au seuil de sélection fixé à -7,0 kcal/mol. La classe des triterpénoïdes oléananes est reconnue dans la littérature pour ses activités antivirales contre le VIH-1.
    </p>
    <p>
      Malgré 2 violations de la règle de Lipinski, plusieurs médicaments anti-VIH approuvés présentent des violations similaires — le Ritonavir, par exemple, affiche un poids moléculaire de 720,9 g/mol. Des stratégies de formulation avancée (nanoparticules lipidiques, liposomes) et d'optimisation structurale sont envisageables pour améliorer la biodisponibilité.
    </p>
    <p>
      Les risques de toxicité hépatique (DILI = 0,915) et respiratoire (0,921) nécessitent une optimisation structurale ciblée, notamment la modification du groupement azo (-N=N-) par des isostères moins toxiques, une approche courante en chimie médicinale.
    </p>

    <h2>6. Conclusion</h2>
    <p>
      Le composé CNP0013909.3 (ZINC000150341587), triterpénoïde oléanane (C₄₄H₅₇N₃O₄, MW = 691,94 g/mol), est identifié comme meilleur candidat inhibiteur de la p24 du VIH-1 avec un score de docking de <strong>-8,99 kcal/mol</strong>. Sur 100 molécules criblées, 21 (21,2%) atteignent le seuil de sélection.
    </p>
    <p>
      Ces résultats justifient des études complémentaires de dynamique moléculaire (GROMACS), d'optimisation structurale et d'évaluation biologique in vitro sur des modèles cellulaires VIH-1.
    </p>

    <h2>Références</h2>
    <ol>
      <li>Trott O, Olson AJ. AutoDock Vina. <em>J Comput Chem</em>. 2010;31(2):455-461.</li>
      <li>Eberhardt J, et al. AutoDock Vina 1.2.0. <em>J Chem Inf Model</em>. 2021.</li>
      <li>Berman HM, et al. The Protein Data Bank. <em>Nucleic Acids Res</em>. 2000.</li>
      <li>Irwin JJ, Shoichet BK. ZINC database. <em>J Chem Inf Model</em>. 2005.</li>
      <li>Pires DEV, et al. pkCSM. <em>J Med Chem</em>. 2015;58(9):4066-4072.</li>
      <li>Xiong G, et al. ADMETlab 2.0. <em>Nucleic Acids Res</em>. 2021.</li>
      <li>Sorokina M, et al. COCONUT online. <em>J Cheminform</em>. 2021;13(1):2.</li>
      <li>ONUSIDA. Statistiques mondiales VIH. Genève: ONUSIDA; 2023.</li>
      <li>O'Boyle NM, et al. Open Babel. <em>J Cheminform</em>. 2011;3:33.</li>
    </ol>
  </BlogArticleLayout>
);

export default BlogP24;
