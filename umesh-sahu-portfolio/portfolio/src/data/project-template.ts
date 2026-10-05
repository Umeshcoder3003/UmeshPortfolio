import type { Project } from "@/types";

/**
 * Copy-paste starting point for a new case study. Not rendered on the site.
 * Every field except the first group is optional: leave out what you do not
 * have and that section is simply hidden. Never add numbers you did not measure.
 */
export const projectTemplate: Project = {
  // ---- Required ----------------------------------------------------------
  slug: "my-new-project", // becomes /projects/my-new-project
  title: "Project name",
  status: "complete", // or "in-progress"
  summary: "One or two sentences for the project card.",
  businessProblem: "What problem does this project solve?",
  technologies: ["Python", "PySpark"],
  architecture: [
    { label: "Source", icon: "source" },
    { label: "Ingestion", icon: "ingestion" },
    { label: "Bronze", icon: "bronze", layer: "bronze" },
    { label: "Transformation", icon: "transform" },
    { label: "Silver", icon: "silver", layer: "silver" },
    { label: "Data Quality", icon: "quality" },
    { label: "Gold", icon: "gold", layer: "gold" },
    { label: "Analytics", icon: "analytics" },
  ],
  concepts: ["Incremental processing"],
  dataQualityTechniques: ["Null handling", "Duplicate handling"],

  // ---- Optional ----------------------------------------------------------
  featured: true,
  objective: "What was the goal?",
  dataset: {
    source: "Where the data comes from",
    structure: "Shape of the data (tables, files, volume if known)",
    fields: ["employee_id", "department"],
  },
  implementation: ["Step 1 of the technical approach", "Step 2"],
  // Put image files in /public/projects/<slug>/ and reference them from "/projects/<slug>/file.png"
  screenshots: [
    {
      src: "/projects/my-new-project/01-source-data.png",
      alt: "Fabric lakehouse showing the raw employee table",
      caption: "Raw data loaded into the Bronze layer",
    },
  ],
  transformations: [
    {
      title: "Standardise department names",
      description: "Why this transformation exists and what it does.",
      language: "python",
      code: `df = df.withColumn("department", F.upper(F.trim("department")))`,
    },
  ],
  dataQuality: {
    nullHandling: "How nulls are detected and handled.",
    duplicateHandling: "How duplicates are identified and removed.",
    invalidRecords: "What counts as invalid and what happens to it.",
    schemaValidation: "How the schema is enforced.",
    dataValidation: "Which business rules are validated.",
    quarantine: "Where rejected records go and how they are reviewed.",
  },
  challenges: [
    { challenge: "A technical challenge you hit", solution: "How you solved it" },
  ],
  result: "One-line result for the card (only if real).",
  results: ["Measured outcome 1 (only real figures)"],
  learnings: ["Data engineering concept this project demonstrated"],
  github: "https://github.com/your-username/your-repo",
};
