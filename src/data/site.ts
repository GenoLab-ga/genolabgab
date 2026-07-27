export const SITE_URL = "https://genolabgab.vercel.app";
export const SITE_NAME = "GenoLabGab";
export const AUTHOR_NAME = "Keny Karl Mounguele";
export const AUTHOR_ROLE_FR = "Ingénieur Bioinformaticien";
export const AUTHOR_ROLE_EN = "Bioinformatics Engineer";


export const researchAxes = [
  {
    icon: "🧬",
    title: { fr: "Génomique computationnelle", en: "Computational Genomics" },
    description: {
      fr: "Développement de pipelines NGS automatisés : contrôle qualité (fastp), alignement (BWA-MEM), détection de variants (bcftools/GATK), annotation fonctionnelle (SnpEff). Application en génomique des populations (projet riz 3K-RGP).",
      en: "Development of automated NGS pipelines: quality control (fastp), alignment (BWA-MEM), variant calling (bcftools/GATK), functional annotation (SnpEff). Applied to population genomics (3K-RGP rice project).",
    },
    tags: ["NGS", "SNPs", "BWA-MEM", "GATK", "SnpEff"],
  },
  {
    icon: "🔬",
    title: { fr: "Bioinformatique structurale & Docking", en: "Structural Bioinformatics & Docking" },
    description: {
      fr: "Criblage virtuel de composés naturels contre des cibles protéiques d'intérêt thérapeutique. Utilisation d'AutoDock Vina, modélisation par AlphaFold2/ColabFold, visualisation moléculaire (PyMOL, ChimeraX, Discovery Studio).",
      en: "Virtual screening of natural compounds against therapeutic protein targets. Using AutoDock Vina, structural modeling with AlphaFold2/ColabFold, molecular visualization (PyMOL, ChimeraX, Discovery Studio).",
    },
    tags: ["AutoDock Vina", "AlphaFold2", "PyMOL", "Virtual Screening"],
  },
  {
    icon: "💉",
    title: { fr: "Vaccinomique & Immunoinformatique", en: "Vaccinomics & Immunoinformatics" },
    description: {
      fr: "Conception de candidats vaccins par approche vaccinomique inverse. Pipeline TBV ciblant Pfs48/45 (Plasmodium falciparum) : prédiction d'épitopes (NetMHCpan, IEDB), modélisation structurale, docking avec récepteurs immunitaires.",
      en: "Vaccine candidate design via reverse vaccinomics. TBV pipeline targeting Pfs48/45 (Plasmodium falciparum): epitope prediction (NetMHCpan, IEDB), structural modeling, docking with immune receptors.",
    },
    tags: ["Vaccinomics", "NetMHCpan", "IEDB", "Plasmodium", "TBV"],
  },
  {
    icon: "🌾",
    title: { fr: "Biologie des plantes & Tolérance aux stress", en: "Plant Biology & Stress Tolerance" },
    description: {
      fr: "Co-auteur d'une étude sur la tolérance à la sécheresse chez la fève (Vicia faba) — analyse phénotypique et biochimique sous stress hydrique. Soumis à Agronomy (MDPI).",
      en: "Co-author of a study on drought tolerance in faba bean (Vicia faba) — phenotypic and biochemical analysis under water stress. Submitted to Agronomy (MDPI).",
    },
    tags: ["Vicia faba", "Drought stress", "Phenotyping", "MDPI Agronomy"],
  },
];

export const projects = [
  {
    id: "p1",
    icon: "🌾",
    title: { fr: "Génomique du riz 3K-RGP", en: "3K-RGP Rice Genomics" },
    description: {
      fr: "Analyse de la diversité génétique et de la structure des populations de riz à partir du dataset 3000 Genomes Rice Project (3K-RGP). Pipeline Snakemake complet.",
      en: "Analysis of genetic diversity and population structure in rice using the 3000 Genomes Rice Project (3K-RGP) dataset. Complete Snakemake pipeline.",
    },
    tags: ["Snakemake", "PLINK", "VCFtools", "R"],
    status: { fr: "En cours", en: "In progress" },
    statusColor: "amber",
  },
  {
    id: "p2",
    icon: "💊",
    title: { fr: "TBV Pfs48/45 — Vaccin anti-paludéen", en: "TBV Pfs48/45 — Malaria Vaccine" },
    description: {
      fr: "Conception d'un candidat vaccin bloquant la transmission de Plasmodium falciparum. Vaccinomique inverse : prédiction d'épitopes B et T, modélisation structurale, validation par docking.",
      en: "Design of a transmission-blocking vaccine candidate against Plasmodium falciparum. Reverse vaccinomics: B and T epitope prediction, structural modeling, validation by docking.",
    },
    tags: ["NetMHCpan", "IEDB", "AutoDock Vina", "AlphaFold2"],
    status: { fr: "En cours", en: "In progress" },
    statusColor: "amber",
  },
  {
    id: "p3",
    icon: "🧫",
    title: { fr: "Criblage anti-VIH — Protéine p24", en: "Anti-HIV Screening — p24 Protein" },
    description: {
      fr: "Criblage virtuel de 100 composés naturels de la base CNP contre la protéine de capside p24 du VIH-1. Meilleur hit identifié avec −8.99 kcal/mol.",
      en: "Virtual screening of 100 natural compounds from the CNP database against HIV-1 capsid protein p24. Best hit identified at −8.99 kcal/mol.",
    },
    tags: ["AutoDock Vina", "Python", "CNP Database", "PDB"],
    status: { fr: "Terminé", en: "Completed" },
    statusColor: "emerald",
  },
  {
    id: "p4",
    icon: "🌱",
    title: { fr: "Tolérance à la sécheresse — Vicia faba", en: "Drought Tolerance — Vicia faba" },
    description: {
      fr: "Étude phénotypique et biochimique de génotypes de fève sous stress hydrique. Analyse des indices physiologiques et biochimiques de tolérance.",
      en: "Phenotypic and biochemical study of faba bean genotypes under water stress. Analysis of physiological and biochemical tolerance indices.",
    },
    tags: ["R", "Statistiques", "Phénotypage", "MDPI"],
    status: { fr: "Soumis", en: "Submitted" },
    statusColor: "blue",
  },
];
