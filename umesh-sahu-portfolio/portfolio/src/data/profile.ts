import type { Experience, SkillGroup } from "@/types";

/* ------------------------------------------------------------------ About */
export const about = {
  paragraphs: [
    "I work on the path from raw data to datasets people can trust. My foundation is SQL, Oracle and PL/SQL: designing database objects, tuning queries and building ETL processes that move and reshape data reliably.",
    "I build on that foundation with PySpark, Apache Spark and Microsoft Fabric, developing lakehouse-style pipelines that treat validation, duplicate handling, null handling and quarantine logic as part of the design rather than an afterthought.",
    "I am most useful where a data problem is unclear: I analyse the data, find what is wrong with it, design the transformation, and debug through to root cause when something breaks.",
  ],
  focus: [
    "SQL & Oracle",
    "PL/SQL development",
    "ETL & data processing",
    "Data transformation",
    "Data quality",
    "Data modelling",
    "Performance optimization",
    "PySpark",
    "Microsoft Fabric",
  ],
};

/* ------------------------------------------------------------- Experience */
/**
 * TODO: replace with your real roles. Add one object per company (newest first).
 * Only add measurable achievements you can stand behind. Leave `achievements`
 * empty if you have no real metrics. Remove `placeholder: true` when done.
 */
export const experience: Experience[] = [
  {
    placeholder: true,
    company: "[COMPANY_NAME]",
    role: "[ROLE_TITLE]",
    duration: "[START] to [END / Present]",
    domain: "[DOMAIN, e.g. Banking, Telecom, Retail]",
    responsibilities: [
      "Developed and maintained Oracle database objects: stored procedures, functions, packages, triggers and views.",
      "Wrote and optimized SQL for reporting, data processing and ETL workloads.",
      "Supported production systems: debugging failures and performing root cause analysis.",
    ],
    contributions: [
      "Performance tuning of slow queries and database jobs, including partitioning where appropriate.",
      "Built data transformation and validation logic to keep downstream data consistent.",
    ],
    achievements: [],
  },
];

/* ----------------------------------------------------------------- Skills */
/**
 * level: "professional" = used in professional work
 *        "handson"      = built through hands-on projects and learning
 * Adjust these to match your real experience.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Data Engineering",
    icon: "transform",
    blurb: "Designing how data is moved, cleaned and made trustworthy.",
    skills: [
      { name: "ETL / ELT", level: "professional" },
      { name: "Data Pipelines", level: "professional" },
      { name: "Data Transformation", level: "professional" },
      { name: "Data Quality", level: "professional" },
      { name: "Data Validation", level: "professional" },
      { name: "Data Modelling", level: "handson" },
      { name: "Data Warehousing", level: "handson" },
      { name: "Incremental Processing", level: "handson" },
      { name: "Lakehouse Architecture", level: "handson" },
    ],
  },
  {
    title: "Big Data",
    icon: "spark",
    blurb: "Distributed processing for data that outgrows a single database.",
    skills: [
      { name: "Apache Spark", level: "handson" },
      { name: "PySpark", level: "handson" },
      { name: "Spark SQL", level: "handson" },
    ],
  },
  {
    title: "Microsoft & Cloud",
    icon: "fabric",
    blurb: "Modern data platforms and the lakehouse pattern.",
    skills: [
      { name: "Microsoft Fabric", level: "handson" },
      { name: "Azure Data Engineering", level: "handson" },
      { name: "Azure Databricks", level: "handson" },
      { name: "Data Lakehouse", level: "handson" },
    ],
  },
  {
    title: "Programming",
    icon: "python",
    blurb: "The languages used to build and test data logic.",
    skills: [
      { name: "SQL", level: "professional" },
      { name: "Python", level: "handson" },
      { name: "PySpark", level: "handson" },
    ],
  },
  {
    title: "Database",
    icon: "sql",
    blurb: "The core of my background: building and tuning relational systems.",
    skills: [
      { name: "Oracle", level: "professional" },
      { name: "PL/SQL", level: "professional" },
      { name: "SQL", level: "professional" },
      { name: "Performance Tuning", level: "professional" },
      { name: "Stored Procedures", level: "professional" },
      { name: "Functions", level: "professional" },
      { name: "Packages", level: "professional" },
      { name: "Triggers", level: "professional" },
      { name: "Views", level: "professional" },
      { name: "Partitioning", level: "professional" },
    ],
  },
];

/* -------------------------------------------------------- How I solve data */
export const processSteps = [
  { title: "Understand Requirement", text: "Clarify what the data is for, who uses it and what “correct” means." },
  { title: "Analyze Data", text: "Profile the sources: structure, keys, volume, null patterns and outliers." },
  { title: "Identify Data Quality Issues", text: "Catalogue duplicates, invalid values, schema drift and inconsistent records." },
  { title: "Design Transformation", text: "Define cleansing rules, business logic and the target data model." },
  { title: "Build Pipeline", text: "Implement ingestion and transformations in SQL, PL/SQL or PySpark." },
  { title: "Validate Data", text: "Reconcile counts, enforce rules and quarantine records that fail them." },
  { title: "Optimize", text: "Tune queries, partitioning and processing for runtime and maintainability." },
  { title: "Monitor & Troubleshoot", text: "Watch runs, debug failures and trace issues back to root cause." },
];

/* ---------------------------------------------------------- What I bring */
export const highlights = [
  { title: "Strong SQL Foundation", text: "Experience with SQL, Oracle and database development." },
  { title: "ETL & Data Processing", text: "Hands-on experience working with ETL and data transformation." },
  { title: "Data Quality Mindset", text: "Focus on validation, duplicate handling, null handling and reliable datasets." },
  { title: "Big Data Technologies", text: "Hands-on learning and project experience with PySpark and Apache Spark." },
  { title: "Modern Data Platforms", text: "Hands-on experience with Microsoft Fabric and related Data Engineering concepts." },
  { title: "Problem Solving", text: "Strong debugging, RCA and technical problem-solving capabilities." },
];

/* --------------------------------------------------------------- Learning */
export const exploring = [
  { name: "PySpark", icon: "spark", text: "DataFrame transformations and distributed processing patterns." },
  { name: "Microsoft Fabric", icon: "fabric", text: "Lakehouses, notebooks and pipelines on a unified platform." },
  { name: "Azure Data Engineering", icon: "azure", text: "Cloud storage, orchestration and data services on Azure." },
  { name: "Databricks", icon: "databricks", text: "Spark workloads and Delta-based lakehouse development." },
  { name: "Advanced Python", icon: "python", text: "Cleaner, testable code for data processing." },
  { name: "Data Modelling", icon: "warehouse", text: "Dimensional models and layered (medallion) design." },
  { name: "Data Engineering Architecture", icon: "serving", text: "How ingestion, processing, quality and serving fit together." },
  { name: "Lakehouse Architecture", icon: "lake", text: "Combining lake flexibility with warehouse reliability." },
] as const;

/* ---------------------------------------------------------- Certifications */
/** Add only certifications you actually hold. While empty, placeholders are shown. */
export const certifications: { name: string; issuer: string; year?: string; url?: string }[] = [
  // { name: "Certification name", issuer: "Issuer", year: "2025", url: "https://..." },
];
