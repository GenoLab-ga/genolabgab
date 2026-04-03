import BlogArticleLayout from "@/components/BlogArticleLayout";

const BlogNGS = () => (
  <BlogArticleLayout
    title="Séquençage NGS : Comment bien pré-traiter vos données génomiques ?"
    metaDescription="Découvrez les étapes clés du pré-traitement des données NGS : contrôle qualité FastQC, trimming Trimmomatic et alignement BWA. Guide pratique par GenoLabGab."
    category="NGS & Génomique"
    readTime="6 min"
    date="15 Jan 2025"
    tags={["NGS", "pré-traitement données génomiques", "FastQC", "Trimmomatic", "BWA", "bioinformatique", "séquençage Illumina", "GATK", "pipeline bioinformatique"]}
  >
    <p>
      Le séquençage de nouvelle génération (NGS) a révolutionné la biologie moléculaire et la médecine génomique. Aujourd'hui, un seul run Illumina peut générer des dizaines de gigaoctets de données brutes. Mais avant toute analyse biologique, ces données doivent passer par une phase critique souvent sous-estimée : le pré-traitement.
    </p>

    <h2>Pourquoi le pré-traitement est-il indispensable ?</h2>
    <p>Les données brutes issues d'un séquenceur NGS contiennent systématiquement :</p>
    <ul>
      <li>Des reads de faible qualité en extrémité 3'</li>
      <li>Des séquences d'adaptateurs Illumina non retirées</li>
      <li>Des duplicats PCR introduits lors de la librairie</li>
      <li>Des contaminations croisées entre échantillons (index hopping)</li>
    </ul>
    <p>
      Ignorer ces artefacts conduit inévitablement à des faux positifs dans la détection de variants, à des alignements incorrects et à des conclusions biologiques erronées.
    </p>

    <h2>Les 4 étapes fondamentales</h2>

    <h3>1. Contrôle qualité initial — FastQC</h3>
    <p>
      La première étape consiste à évaluer la qualité des reads bruts avec FastQC. Cet outil génère un rapport HTML contenant :
    </p>
    <ul>
      <li>La distribution des scores Phred par position</li>
      <li>La composition en bases (GC content)</li>
      <li>La présence d'adaptateurs et de séquences sur-représentées</li>
    </ul>
    <p>
      Un score Phred ≥ 30 indique une précision de base de 99,9 %. En dessous de Q20, le taux d'erreur devient biologiquement significatif.
    </p>

    <h3>2. Trimming des adaptateurs — Trimmomatic / Fastp</h3>
    <p>Une fois les problèmes identifiés, Trimmomatic ou Fastp permettent de :</p>
    <ul>
      <li>Retirer les séquences d'adaptateurs en 3' et 5'</li>
      <li>Tronquer les bases de faible qualité (sliding window trimming)</li>
      <li>Éliminer les reads trop courts après trimming (longueur minimale recommandée : 36 bp)</li>
    </ul>
    <p>
      Fastp est aujourd'hui préféré pour sa rapidité (multi-threading) et son rapport automatisé intégré.
    </p>

    <h3>3. Alignement sur le génome de référence — BWA-MEM2 / STAR</h3>
    <p>Le choix de l'aligneur dépend du type de données :</p>
    <ul>
      <li><strong>BWA-MEM2</strong> : optimal pour les données WGS (Whole Genome Sequencing) et WES (Whole Exome Sequencing)</li>
      <li><strong>STAR</strong> : conçu pour les données RNA-Seq, gère les jonctions d'épissage</li>
    </ul>
    <p>
      Le génome de référence utilisé doit être consistant avec les bases de données de variants (GRCh38 pour l'humain).
    </p>

    <h3>4. Post-alignement — marquage des duplicats et recalibration</h3>
    <p>Après alignement, deux étapes supplémentaires sont nécessaires :</p>
    <ul>
      <li><strong>Marquage des duplicats PCR</strong> : avec Picard MarkDuplicates ou samtools markdup</li>
      <li><strong>Base Quality Score Recalibration (BQSR)</strong> : avec GATK, pour corriger les biais systématiques du séquenceur</li>
    </ul>

    <h2>Pipeline type en production</h2>
    <p>Un pipeline NGS robuste et reproductible suit généralement cette architecture :</p>
    <div className="glass rounded-xl p-4 my-6 font-mono text-sm text-primary">
      FASTQ bruts → FastQC → Fastp → BWA-MEM2 → samtools sort → Picard MarkDuplicates → GATK BQSR → BAM prêt pour l'analyse
    </div>
    <p>
      Chez GenoLabGab, nos pipelines sont implémentés avec <strong>Snakemake</strong> pour garantir la reproductibilité, la traçabilité et la scalabilité sur tout type d'infrastructure.
    </p>

    <h2>Conclusion</h2>
    <p>
      Un pré-traitement rigoureux est la fondation de toute analyse NGS fiable. Il ne s'agit pas d'une formalité, mais d'une étape scientifique à part entière qui conditionne la qualité de l'ensemble de la chaîne analytique.
    </p>
    <p>
      <strong>Vous avez des données NGS à analyser ?</strong> Contactez GenoLabGab pour un accompagnement personnalisé.
    </p>
  </BlogArticleLayout>
);

export default BlogNGS;
