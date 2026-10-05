export type Layer = "bronze" | "silver" | "gold";

export type IconKey =
  | "source" | "ingestion" | "bronze" | "silver" | "gold"
  | "validation" | "quality" | "transform" | "storage" | "serving"
  | "analytics" | "curated" | "sql" | "oracle" | "python" | "spark"
  | "fabric" | "databricks" | "azure" | "lake" | "warehouse" | "api" | "file";

export type ArchitectureStage = {
  label: string;
  detail?: string;
  icon: IconKey;
  /** Optional medallion layer: colours the stage bronze / silver / gold. */
  layer?: Layer;
};

export type Project = {
  slug: string; // used in the URL: /projects/<slug>
  title: string;
  status: "complete" | "in-progress";
  featured?: boolean;
  summary: string; // short description shown on the card
  businessProblem: string;
  objective?: string;
  dataset?: { source: string; structure?: string; fields?: string[] };
  technologies: string[];
  architecture: ArchitectureStage[];
  concepts: string[]; // key engineering concepts
  dataQualityTechniques: string[]; // short list shown on the card
  implementation?: string[]; // ordered steps
  /** Step-by-step screenshots. Files go in /public/projects/<slug>/ */
  screenshots?: { src: string; alt: string; caption?: string }[];
  transformations?: { title: string; description: string; code?: string; language?: string }[];
  dataQuality?: {
    nullHandling?: string;
    duplicateHandling?: string;
    invalidRecords?: string;
    schemaValidation?: string;
    dataValidation?: string;
    quarantine?: string;
  };
  challenges?: { challenge: string; solution: string }[];
  result?: string; // one-line result for the card
  results?: string[]; // detailed results (only real, measurable ones)
  learnings?: string[];
  github?: string;
};

export type SkillLevel = "professional" | "handson";

export type SkillGroup = {
  title: string;
  blurb: string;
  icon: IconKey;
  skills: { name: string; level: SkillLevel }[];
};

export type Experience = {
  company: string;
  role: string;
  duration: string;
  domain: string;
  responsibilities: string[];
  contributions: string[];
  achievements: string[]; // only real metrics / outcomes
  /** Shows an "edit me" banner. Remove once the entry has real details. */
  placeholder?: boolean;
};

export type Repo = {
  name: string;
  description: string;
  url: string;
  language?: string;
};
