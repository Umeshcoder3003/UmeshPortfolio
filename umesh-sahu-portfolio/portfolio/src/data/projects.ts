import type { Project } from "@/types";

/**
 * ALL project content lives here. To add a case study:
 *   1. Copy src/data/project-template.ts
 *   2. Fill it in (delete fields you do not have: empty sections are hidden)
 *   3. Add it to the array below.
 */
export const projects: Project[] = [
  {
    slug: "employee-data-quality-etl-pipeline",
    title: "Employee Data Quality & ETL Pipeline",
    status: "in-progress",
    featured: true,
    summary:
      "A pipeline that processes employee data and separates valid records from null, invalid and inconsistent ones before publishing a curated dataset.",
    businessProblem:
      "Process employee data while identifying null, invalid and inconsistent records.",
    technologies: ["Python", "PySpark", "Microsoft Fabric", "SQL"],
    architecture: [
      { label: "Source", icon: "source" },
      { label: "Ingestion", icon: "ingestion" },
      { label: "Validation", icon: "validation" },
      { label: "Data Quality", icon: "quality" },
      { label: "Transformation", icon: "transform" },
      { label: "Curated Dataset", icon: "curated", layer: "gold" },
    ],
    concepts: [
      "Data validation",
      "Data quality checks",
      "Layered transformation",
      "Curated datasets",
    ],
    dataQualityTechniques: [
      "Null detection",
      "Invalid record detection",
      "Inconsistency checks",
    ],
  },

  {
    slug: "granduer-properties-ingestion-pipeline",
    title: "Granduer Properties: Landing-to-Lakehouse Ingestion Pipeline",
    status: "in-progress",
    featured: true,
    summary:
      "A Microsoft Fabric pipeline that loads property listing CSV files from a landing zone into a Lakehouse silver table, archives the processed files and clears the landing zone.",
    // TODO: replace with the real business context for this dataset
    businessProblem:
      "Incoming property listing files need to be loaded into a queryable table without creating duplicate rows, while keeping a copy of every processed file and leaving the landing zone clean for the next batch.",
    objective:
      "Automate the file-to-table load so that each run ingests new files, upserts them into the silver table, archives the originals and removes them from the landing zone.",
    dataset: {
      source: "office_*.csv files in the Lakehouse folder Files/CS_1/Landingzone",
      structure: "Delimited text (CSV) files loaded into the silver listing table in the Granduer_properties schema",
    },
    technologies: ["Microsoft Fabric", "Fabric Data Pipeline", "Lakehouse", "CSV"],
    architecture: [
      { label: "CSV Files", icon: "file" },
      { label: "Landing Zone", icon: "storage" },
      { label: "Copy to Lakehouse", icon: "ingestion" },
      { label: "Silver Table", icon: "silver", layer: "silver", detail: "Upsert" },
      { label: "Archive Zone", icon: "storage" },
      { label: "Landing Cleanup", icon: "transform" },
    ],
    concepts: [
      "Landing and archive zone pattern",
      "Wildcard file ingestion",
      "Upsert loading",
      "Activity dependencies in a pipeline",
      "Post-load cleanup",
    ],
    dataQualityTechniques: [
      "Upsert to avoid duplicate rows",
      "Success-only activity chaining",
      "Archived copy of every processed file",
    ],
    implementation: [
      "Created a Lakehouse folder structure with a Landingzone for incoming files and an Archivezone for processed ones.",
      "Built a Copy activity that reads office_*.csv from the Landingzone using a wildcard path and loads the silver listing table with the Upsert table action.",
      "Added a second Copy activity that archives the same files to the Archivezone as DelimitedText, running only after the load succeeds.",
      "Added a Delete activity that removes the processed files from the Landingzone, running only after the archive succeeds.",
      "Ran the pipeline and confirmed all three activities succeeded in sequence.",
    ],
    screenshots: [
      {
        src: "/projects/granduer-properties/0.png",
        alt: "Lakehouse explorer showing the CS_1 folder with Landingzone and Archivezone subfolders",
        caption: "Lakehouse folder structure: a Landingzone for incoming CSV files and an Archivezone for processed ones",
      },
      {
        src: "/projects/granduer-properties/1.png",
        alt: "Copy data activity source settings using a wildcard path to office_*.csv in the Landingzone",
        caption: "Copy activity source: reads office_*.csv files from CS_1/Landingzone using a wildcard path, searching recursively",
      },
      {
        src: "/projects/granduer-properties/2.png",
        alt: "Copy data activity destination settings loading a silver listing table with the Upsert table action",
        caption: "Copy activity destination: loads the silver listing table in the Granduer_properties schema using Upsert, so new rows are inserted and existing rows updated",
      },
      {
        src: "/projects/granduer-properties/3.png",
        alt: "Archive data activity source settings reading office_*.csv from the Landingzone",
        caption: "Archive activity source: picks up the same office_*.csv files from the Landingzone once the load has succeeded",
      },
      {
        src: "/projects/granduer-properties/4.png",
        alt: "Archive data activity destination settings writing DelimitedText files to the Archivezone folder",
        caption: "Archive activity destination: copies the files to CS_1/Archivezone as DelimitedText",
      },
      {
        src: "/projects/granduer-properties/5.jpg",
        alt: "Delete data activity source settings targeting all files in the Landingzone folder",
        caption: "Delete activity: removes the processed files from the Landingzone (wildcard *.*) after they have been archived",
      },
      {
        src: "/projects/granduer-properties/6.png",
        alt: "Pipeline run output showing Copy Data To Lakehouse, Archive data and Delete data1 all succeeded",
        caption: "Successful run: Copy Data To Lakehouse (21s), Archive data (14s) and Delete data1 (5s) completed in sequence",
      },
    ],
    results: [
      "Pipeline run succeeded end to end: load to Lakehouse (21s), archive (14s), delete from landing zone (5s).",
    ],
    // github: "https://github.com/your-username/your-repo",
  },
  
  
  {
    slug: "global-freight-forwarders-logistics-data-modernization",
    title: "Global Freight Forwarders: Logistics Data Modernization",
    status: "in-progress",
    featured: true,
    summary:
      "An automated, incremental data ingestion pipeline within the Microsoft Fabric ecosystem. The solution introduces a watermark-based state tracking mechanism that autonomously detects net-new JSON files, filters them by last-modified time, and appends them into a governed Delta table in the Bronze layer. Manual intervention is eliminated, only new records are processed on each run, and downstream reporting now stands on an auditable foundation that scales with volume rather than against it.",
    // TODO: replace with the real business context for this dataset
    businessProblem:
      "The manual approach scales linearly with volume. Volume is not staying still. The next missed file is one busy morning away.",
    objective:
      "Global Freight Forwarders is a market leader in international logistics, managing high-velocity supply chains across multiple continents. The Operations Department serves as the nerve centre, relying on a continuous stream of shipment logs to monitor carrier performance and delivery timelines. Logs arrive daily as raw JSON files in a central Lakehouse, each capturing a shipment's origin, destination, carrier, status, and timestamp. Together they represent the ground truth of GFF's global cargo movements.",
    dataset: {
      source: "High-velocity JSON files, one per shipment event (log_<guid>.json, ~240-270 B each), landed in the CS_2 folder of the Lakehouse.",
      structure: "JSON files loaded into the ShippingLogs table in the GFF schema, with a companion watermarktable (TableName STRING, Watermarkvalue TIMESTAMP) tracking the last successful load.",
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Data Pipeline",
      "Lakehouse",
      "Delta Lake",
      "PySpark",
      "Spark SQL",
      "JSON",
    ],
    architecture: [
      { label: "JSON Files (CS_2)", icon: "file" },
      { label: "Lookup Watermark", icon: "ingestion", detail: "Get_mod_time" },
      { label: "Copy to Lakehouse", icon: "ingestion", detail: "Last-modified filter" },
      { label: "ShippingLogs Table", icon: "storage", layer: "bronze", detail: "APPEND" },
      { label: "Update Watermark", icon: "transform", detail: "Notebook" },
    ],
    concepts: [
      "Watermark-based incremental loading stored in a Delta table",
      "Filter by last modified: window between the previous watermark and the pipeline trigger time",
      "Append over Upsert for immutable, event-level records",
      "Parameterised notebook activity (pipeline-to-notebook hand-off)",
      "Capturing @pipeline().TriggerTime so files landing mid-run are not missed",
    ],
    dataQualityTechniques: [
      "Append-only incremental ingestion via watermark. Shipment events are immutable and unique per file, so Append is correct and Upsert would add key-matching cost for no benefit. The shift is from manual judgement to state-aware orchestration.",
      "Success-only activity chaining: the watermark advances only if the Copy activity succeeds, so a failed load is retried on the next run",
      "Accurately pick files stored after the previous run using Start = last watermark and End = pipeline trigger time",
    ],
    implementation: [
      "Organised the Lakehouse Files area into CS_ folders, with CS_2 holding the incoming shipment log JSON files.",
      "Created the GFF.watermarktable Delta table (TableName STRING, Watermarkvalue TIMESTAMP) in a Spark SQL notebook and seeded it with the initial watermark row.",
      "Added a Lookup activity (Get_mod_time) that reads GFF.watermarktable with First row only enabled.",
      "Built a Copy activity that reads JSON from CS_2 recursively, filtered by last modified between the Lookup's watermark and @pipeline().TriggerTime, and loads GFF.ShippingLogs with the Append table action.",
      "Added a Notebook activity (UpdateWatermark) chained on success of the Copy activity, passing PipelineRunTimeStamp = @pipeline().TriggerTime as a base parameter.",
      "In the update notebook, ran an UPDATE on watermarktable setting Watermarkvalue to the passed timestamp WHERE Tablename = 'ShippingLogs'.",
      "Debugged a NameError ('PipelineRunTimeStamp' is not defined): the notebook needs a parameter cell declaring PipelineRunTimeStamp so the pipeline can override it at run time.",
    ],
    screenshots: [
      {
        src: "/projects/Incremental-Shipping/0.png",
        alt: "Lakehouse explorer showing the CS_2 folder containing six JSON log files",
        caption: "Source data: shipment event logs landing in Files/CS_2 as individual JSON files",
      },
      {
        src: "/projects/Incremental-Shipping/6.png",
        alt: "Spark SQL notebook creating and querying the GFF watermarktable",
        caption: "State table: GFF.watermarktable (TableName, Watermarkvalue) created in a Spark SQL notebook and queried to confirm its single row",
      },
      {
        src: "/projects/Incremental-Shipping/1.png",
        alt: "Lookup activity Get_mod_time reading GFF.watermarktable with First row only enabled",
        caption: "Lookup activity: Get_mod_time reads the last watermark from GFF.watermarktable (first row only)",
      },
      {
        src: "/projects/Incremental-Shipping/2.png",
        alt: "Copy data source settings reading JSON from CS_2 with a filter by last modified window",
        caption: "Copy activity source: reads JSON from CS_2 recursively, filtered by last modified from the Lookup watermark to @pipeline().TriggerTime",
      },
      {
        src: "/projects/Incremental-Shipping/3.png",
        alt: "Copy data destination settings loading GFF.ShippingLogs with the Append table action",
        caption: "Copy activity destination: loads GFF.ShippingLogs using Append, since each shipment event is a new immutable record",
      },
      {
        src: "/projects/Incremental-Shipping/4.png",
        alt: "Notebook activity settings passing PipelineRunTimeStamp as @pipeline().TriggerTime",
        caption: "Notebook activity: UpdateWatermark receives PipelineRunTimeStamp = @pipeline().TriggerTime and runs only after the Copy succeeds",
      },
      {
        src: "/projects/Incremental-Shipping/5.png",
        alt: "Update watermark notebook showing a NameError for PipelineRunTimeStamp",
        caption: "Debugging: the UPDATE statement failed with a NameError until the timestamp was declared in a parameter cell",
      },
    ],
    results: [
      // TODO: add run durations and row counts after a fully successful end-to-end run
      "Incremental pattern designed and wired end to end: Lookup, Copy (Append), and Notebook watermark update chained on success.",
    ],
    // github: "your-username/your-repo",
  },
  
    {
    slug: "innovate-solutions-workforce-intelligence-bronze-to-silver",
    title: "Innovate Solutions: Workforce Intelligence from Azure SQL to Lakehouse",
    status: "completed",
    featured: false,
    summary:
      "A Bronze-to-Silver pipeline in Microsoft Fabric that replaces a manual SQL-export-and-Excel HR workflow. A Fabric Data Pipeline copies employee records from Azure SQL into a Bronze Delta table, and a PySpark notebook quarantines bad records with a reason, collapses duplicates to the latest version, enriches and joins department context, stamps every row, and protects personal data with hashing and masking. Every one of the 332 records that entered Bronze is accounted for: 20 quarantined, 5 duplicates removed, 307 in Silver.",
    businessProblem:
      "HR reports depended on ad-hoc SQL exports, manual cleanup in Excel and emailed spreadsheets. Each report took about 48 hours, was stale on arrival, introduced version conflicts, and exposed employee names and salaries with no governance or access control.",
    objective:
      "Innovate Solutions is a technology consulting firm with hubs in London, New York and Singapore, spread across nine business units. Employee records sit in a well-maintained Azure SQL Database with no engineering layer between the source and the analysts. The goal was to build that missing layer: Bronze keeps the raw extract untouched, and Silver delivers one clean, enriched and protected record per employee as the foundation for HR reporting.",
    dataset: {
      source: "Azure SQL Database (InnovateSolutions.Employees, 332 rows) copied into the Lakehouse by a Fabric Pipeline, plus a static departments.csv reference file (10 departments, 4 cities, 3 regions) uploaded to Files/CS_4.",
      structure: "Employees: employee_id, employee_name, job_title, department_id, hire_date, salary, updated_at. Departments: department_id, department_name, location, region. Known issues: 18 null fields, 2 invalid salaries, 5 duplicate employee_ids and about 36 name prefixes.",
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Data Pipeline",
      "Azure SQL Database",
      "Lakehouse",
      "Delta Lake",
      "PySpark",
      "Spark SQL",
      "Medallion Architecture",
    ],
    architecture: [
      { label: "Azure SQL (Employees)", icon: "file" },
      { label: "Copy Activity", icon: "ingestion", detail: "Full load" },
      { label: "Bronze Employees", icon: "storage", layer: "bronze", detail: "Raw, read-only" },
      { label: "PySpark Notebook", icon: "transform", detail: "Cleanse + enrich" },
      { label: "silver_employees", icon: "storage", layer: "silver", detail: "Protected" },
      { label: "silver_quarantine", icon: "storage", layer: "silver", detail: "Rejected + reason" },
    ],
    concepts: [
      "Medallion architecture: Bronze stays raw, all cleaning happens in Silver",
      "Quarantine instead of drop: every rejected record is kept with a quarantine_reason",
      "Latest-record-wins deduplication on updated_at",
      "Reusable PySpark functions for tenure group, salary band and data protection",
      "Left join to the department reference so no employee is silently lost",
      "Hashing (SHA-256) and masking of personal data before anything is saved",
      "Row-count reconciliation: Bronze = quarantine + duplicates + Silver",
    ],
    dataQualityTechniques: [
      "NULL_FIELD quarantine: 18 records with a null hire_date or salary are moved out of the working set, since neither can be defaulted.",
      "INVALID_SALARY quarantine: 2 records with salary below 0 or equal to the 9,999,999 sentinel are rejected as out of plausible range.",
      "Left-anti join removes quarantined employee_ids from the working dataset, so no bad record reaches Silver and none is silently dropped.",
      "Deduplication on latest updated_at keeps one row per employee_id, taking the working set from 312 rows to 307.",
      "Personal data protection: employee_name replaced by a SHA-256 hash and salary replaced by an asterisk mask, with the clear-text columns dropped.",
      "Count reconciliation proves nothing is lost: 332 in Bronze = 20 quarantined + 5 duplicates removed + 307 in Silver.",
    ],
    implementation: [
      "Created an Azure SQL Database connection in the Fabric Data Pipeline (server fabric-project-srv-2027.database.windows.net, Basic authentication).",
      "Configured the Copy activity source to read the full InnovateSolutions.employees table from the msfabricbootcamp database.",
      "Set the Copy destination to the LH_Umeshsahu Lakehouse Tables area (InnovateSolutions.Employees) with the Overwrite table action, creating the Bronze layer.",
      "Loaded departments.csv from Files/CS_4 into a PySpark DataFrame as the static department reference (10 rows, 4 columns).",
      "Read the Bronze employees table into employees_df and confirmed the shape: 332 rows and 7 columns.",
      "Built null_df by filtering null salary or hire_date and tagging quarantine_reason = NULL_FIELD (18 rows).",
      "Built INVALID_DF by filtering salary < 0 or salary = 9999999 and tagging INVALID_SALARY (2 rows).",
      "Combined both with unionByName into quarantine_df (20 rows), then used a left_anti join on employee_id to produce working_df (312 rows).",
      "Deduplicated by ordering on updated_at descending and dropping duplicates on employee_id, giving 307 unique employees.",
      "Wrote reusable functions cal_tenure_grp (New / Established / Veteran) and Salary_band (Junior / Mid / Senior) using chained when/otherwise.",
      "Enriched the data with Hire_year, Tenure (from months_between against current_date), Tenure_Group and Salary_band (11 columns).",
      "Left-joined departments on department_id, stamped transformed_at with current_timestamp(), and extracted name_prefix (Mr, Mrs, Ms) with regexp_extract / regexp_replace (16 columns).",
      "Defined hash_algo (sha2, 256) and Mask_sal, then built protected_df with employee_name_hash and salary_masked and dropped employee_name and salary.",
      "Wrote silver_employees and silver_quarantine to the Lakehouse as Delta tables and printed the reconciliation counts.",
    ],
        screenshots: [
      {
        src: "/projects/Innovate-solutions/Screenshot (37).png",
        alt: "Fabric pipeline Connect data source dialog for Azure SQL database with server and Basic authentication",
        caption: "Source connection: new Azure SQL Database connection created from the Fabric pipeline",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (38).png",
        alt: "Copy data activity source tab reading InnovateSolutions.employees from the msfabricbootcamp database",
        caption: "Copy activity source: full copy of InnovateSolutions.employees from Azure SQL",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (39).png",
        alt: "Copy data activity destination tab loading InnovateSolutions.Employees into the LH_Umeshsahu Lakehouse with Overwrite",
        caption: "Copy activity destination: raw employee data lands in the Lakehouse as the Bronze table (Overwrite)",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (40).png",
        alt: "Notebook reading departments.csv from Files/CS_4 and displaying 10 department rows",
        caption: "Inspect: departments.csv loaded from Files/CS_4 as the static department reference (10 rows, 4 columns)",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (41).png",
        alt: "Notebook reading the Bronze employees table, showing 7 columns and 332 rows",
        caption: "Inspect: Bronze employees read into employees_df, 332 rows and 7 columns",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (42).png",
        alt: "null_df filtering null salary or hire_date and tagging quarantine_reason NULL_FIELD, 18 rows",
        caption: "Quarantine: 18 records with a null hire_date or salary tagged NULL_FIELD",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (43).png",
        alt: "INVALID_DF filtering salary below zero or equal to 9999999, 2 rows",
        caption: "Quarantine: 2 out-of-range salaries (negative and 9,999,999) isolated as INVALID_SALARY",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (44).png",
        alt: "quarantine_df created with unionByName showing 20 rows",
        caption: "Quarantine: both rule sets combined with unionByName into quarantine_df, 20 records",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (45).png",
        alt: "working_df created with a left_anti join on employee_id showing 312 rows",
        caption: "Working set: left_anti join removes quarantined employees, leaving 312 rows",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (46).png",
        alt: "dedup_df ordered by updated_at descending and dropping duplicates on employee_id, 307 rows",
        caption: "Deduplicate: latest updated_at kept per employee_id, 307 unique employees",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (47).png",
        alt: "Python function cal_tenure_grp classifying tenure as New, Established or Veteran",
        caption: "Reusable logic: cal_tenure_grp maps tenure to New, Established or Veteran",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (48).png",
        alt: "Python function Salary_band classifying salary as Junior, Mid or Senior",
        caption: "Reusable logic: Salary_band maps salary to Junior, Mid or Senior",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (49).png",
        alt: "enrich_df adding Hire_year, Tenure, Tenure_Group and Salary_band, 11 columns and 307 rows",
        caption: "Enrich: Hire_year, Tenure, Tenure_Group and Salary_band added (11 columns, 307 rows)",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (50).png",
        alt: "Left join with departments, transformed_at timestamp and name_prefix extraction, 16 columns",
        caption: "Join and stamp: department context joined, transformed_at added, name prefixes split out (16 columns)",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (51).png",
        alt: "hash_algo using sha2 256, Mask_sal function and protected_df dropping employee_name and salary",
        caption: "Protect: SHA-256 name hash and salary mask applied, clear-text columns dropped",
      },
      {
        src: "/projects/Innovate-solutions/Screenshot (52).png",
        alt: "Writing silver_employees and silver_quarantine and printing counts of 332, 307 and 20",
        caption: "Write and reconcile: Silver and quarantine tables saved; counts printed (332 in, 307 Silver, 20 quarantined)",
      },
    ],
    results: [
      "332 records ingested into Bronze reconciled exactly: 20 quarantined + 5 duplicates removed + 307 in Silver.",
      "20 bad records (18 NULL_FIELD, 2 INVALID_SALARY) isolated in silver_quarantine with a reason instead of being dropped.",
      "One row per employee in silver_employees, enriched with hire year, tenure, tenure group, salary band, department name, location, region and a transformed_at timestamp.",
      "Replaces a 48-hour manual export-and-Excel cycle with a repeatable pipeline, ready for a Power BI report and a daily schedule.",
    ],
    // github: "your-username/your-repo",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
