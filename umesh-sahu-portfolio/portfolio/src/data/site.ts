/**
 * Global site settings. Contact links live here and are used everywhere
 * (navbar, hero, contact section, footer, SEO metadata).
 *
 * Values wrapped in [BRACKETS] are treated as "not set yet": buttons fall back
 * gracefully instead of linking to a broken URL.
 */
export const site = {
  name: "Umesh Sahu",
  headline: "Data Engineer | SQL | PySpark | Microsoft Fabric | ETL",
  summary:
    "Data Engineering professional focused on building reliable data pipelines, scalable transformations and data-driven solutions using SQL, Python, PySpark and modern data platforms.",

  // ---- Contact ----------------------------------------------------------
  email: "Umeshnsahu3003@gmail.com",
  linkedin: "https://www.linkedin.com/in/umesh-sahu-385816254",
  github: "[MY_GITHUB_URL]", // e.g. https://github.com/your-username
  resume: "[MY_RESUME_URL]", // e.g. "/resume.pdf" (put the file in /public) or a Drive link

  // ---- SEO --------------------------------------------------------------
  url: "https://your-domain.com", // update after deploying (used for canonical + sitemap)
  location: "India",
  seoTitle: "Umesh Sahu | Data Engineer | SQL, PySpark, Microsoft Fabric, ETL",
  seoDescription:
    "Portfolio of Umesh Sahu, a Data Engineer in India working with SQL, Oracle, PL/SQL, ETL, PySpark and Microsoft Fabric. Explore data engineering projects, case studies and pipeline architectures.",
  keywords: [
    "Data Engineer",
    "Data Engineering portfolio",
    "Data Engineer India",
    "SQL Developer",
    "SQL Data Engineer",
    "ETL Developer",
    "PySpark",
    "Microsoft Fabric",
    "Azure Data Engineering",
    "Databricks",
    "Oracle PL/SQL",
  ],
};

/** Navigation. The "Resume" entry is resolved from site.resume in the Navbar. */
export const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Learning", href: "/#learning" },
  { label: "Resume", href: "resume" },
  { label: "Contact", href: "/#contact" },
];

export const heroBadges = [
  "SQL",
  "Oracle",
  "PL/SQL",
  "Python",
  "PySpark",
  "Apache Spark",
  "Microsoft Fabric",
  "Databricks",
  "ETL",
  "Data Modelling",
];
