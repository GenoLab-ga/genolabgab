import BlogArticleLayout from "@/components/BlogArticleLayout";

const BlogVariants = () => (
  <BlogArticleLayout
    title="Détection de variants génétiques : SNPs, Indels et CNV — Guide complet"
    metaDescription="Comment détecter et interpréter les variants génétiques (SNPs, indels, CNV) à partir de données NGS ? Méthodologie complète par Karl Mounguele, bioinformaticien."
    category="Analyse bioinformatique"
    readTime="7 min"
    date="28 Fév 2025"
    tags={["détection variants", "SNP", "indel", "CNV", "GATK", "HaplotypeCaller", "variant calling", "VEP", "ANNOVAR", "bioinformatique clinique", "génomique médicale"]}
  >
    <p>
      La détection de variants génétiques est au cœur de la médecine génomique moderne. Qu'il s'agisse d'identifier des mutations causales dans une maladie rare, de caractériser la diversité génétique d'une population ou de détecter des altérations somatiques dans un cancer, la qualité du variant calling conditionne directement la valeur clinique ou scientifique de l'analyse.
    </p>

    <h2>Les différents types de variants</h2>

    <h3>SNPs — Single Nucleotide Polymorphisms</h3>
    <p>
      Les SNPs sont les variants les plus fréquents du génome humain. Il s'agit de substitutions d'une seule base (ex: A→G). On en dénombre environ 4 à 5 millions entre deux individus humains. Certains SNPs sont fonctionnels (variants pathogènes dans des gènes codants), d'autres sont silencieux ou localisés dans des régions non codantes.
    </p>

    <h3>Indels — Insertions et Délétions</h3>
    <p>
      Les indels sont des insertions ou délétions de 1 à quelques dizaines de paires de bases. Lorsqu'ils surviennent dans un exon, ils peuvent provoquer un décalage du cadre de lecture (frameshift), avec des conséquences fonctionnelles souvent sévères.
    </p>

    <h3>CNV — Copy Number Variations</h3>
    <p>
      Les CNV correspondent à des duplications ou délétions de segments génomiques plus larges (généralement &gt; 1 kb). Ils représentent une source majeure de variation génétique et sont impliqués dans de nombreuses pathologies : cancers, troubles du neurodéveloppement, maladies rares.
    </p>

    <h3>Variants structuraux (SV)</h3>
    <p>
      Les variants structuraux incluent les inversions, translocations et insertions d'éléments mobiles. Leur détection nécessite des approches spécifiques (long reads Oxford Nanopore, ou outils dédiés comme Manta/LUMPY).
    </p>

    <h2>Pipeline de variant calling : approche GATK Best Practices</h2>

    <h3>Étape 1 — Préparation du BAM</h3>
    <p>
      Avant le variant calling, le fichier BAM doit être trié, dédupliqué et recalibré (BQSR). Ces étapes sont décrites dans notre article sur le pré-traitement NGS.
    </p>

    <h3>Étape 2 — HaplotypeCaller (variants germinaux)</h3>
    <p>
      GATK HaplotypeCaller est le standard pour la détection de variants germinaux (SNPs + indels). Il fonctionne en mode :
    </p>
    <ul>
      <li><strong>Single sample</strong> : pour une analyse individuelle rapide</li>
      <li><strong>GVCF mode</strong> : recommandé pour les cohortes, permet le joint genotyping</li>
    </ul>

    <h3>Étape 3 — Filtration des variants — VQSR ou Hard Filtering</h3>
    <p>Les variants bruts contiennent de nombreux faux positifs. Deux approches de filtration existent :</p>
    <ul>
      <li><strong>VQSR (Variant Quality Score Recalibration)</strong> : méthode statistique robuste, requiert une cohorte suffisamment grande</li>
      <li><strong>Hard filtering</strong> : filtres manuels basés sur QD, MQ, FS, SOR — utilisés pour les petits datasets</li>
    </ul>

    <h3>Étape 4 — Annotation fonctionnelle — ANNOVAR / SnpEff / VEP</h3>
    <p>L'annotation détermine l'impact biologique de chaque variant :</p>
    <ul>
      <li><strong>SnpEff</strong> : annotation rapide des effets fonctionnels (synonyme, missense, frameshift, stop-gain...)</li>
      <li><strong>VEP (Variant Effect Predictor)</strong> : annotation Ensembl, très complète, inclut les scores SIFT, PolyPhen-2</li>
      <li><strong>ANNOVAR</strong> : intègre de nombreuses bases de données (ClinVar, gnomAD, OMIM, dbSNP)</li>
    </ul>

    <h2>Interprétation clinique des variants</h2>
    <p>
      Une fois annotés, les variants sont classifiés selon les guidelines ACMG/AMP en 5 catégories :
    </p>
    <ol>
      <li>Pathogène</li>
      <li>Probablement pathogène</li>
      <li>Variant de signification incertaine (VUS)</li>
      <li>Probablement bénin</li>
      <li>Bénin</li>
    </ol>
    <p>
      La classification repose sur des critères combinant fréquence populationnelle (gnomAD), prédictions in silico, données fonctionnelles et données de ségrégation familiale.
    </p>

    <h2>Ce que propose GenoLabGab</h2>
    <p>Chez GenoLabGab, nous livrons des rapports de variant calling complets comprenant :</p>
    <ul>
      <li>Un fichier VCF annoté et filtré</li>
      <li>Un tableau récapitulatif des variants d'intérêt avec scores de pathogénicité</li>
      <li>Une interprétation clinique accessible aux professionnels de santé</li>
      <li>Des visualisations IGV des variants clés</li>
    </ul>
    <p>
      <strong>Contactez-nous</strong> pour discuter de vos besoins en analyse de variants.
    </p>
  </BlogArticleLayout>
);

export default BlogVariants;
