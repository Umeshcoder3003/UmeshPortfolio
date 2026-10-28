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
    status: "complete",
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
        src: "/projects/Innovate-solutions/1.png",
        alt: "Fabric pipeline Connect data source dialog for Azure SQL database with server and Basic authentication",
        caption: "Source connection: new Azure SQL Database connection created from the Fabric pipeline",
      },
      {
        src: "/projects/Innovate-solutions/2.png",
        alt: "Copy data activity source tab reading InnovateSolutions.employees from the msfabricbootcamp database",
        caption: "Copy activity source: full copy of InnovateSolutions.employees from Azure SQL",
      },
      {
        src: "/projects/Innovate-solutions/3.png",
        alt: "Copy data activity destination tab loading InnovateSolutions.Employees into the LH_Umeshsahu Lakehouse with Overwrite",
        caption: "Copy activity destination: raw employee data lands in the Lakehouse as the Bronze table (Overwrite)",
      },
      {
        src: "/projects/Innovate-solutions/4.png",
        alt: "Notebook reading departments.csv from Files/CS_4 and displaying 10 department rows",
        caption: "Inspect: departments.csv loaded from Files/CS_4 as the static department reference (10 rows, 4 columns)",
      },
      {
        src: "/projects/Innovate-solutions/5.png",
        alt: "Notebook reading the Bronze employees table, showing 7 columns and 332 rows",
        caption: "Inspect: Bronze employees read into employees_df, 332 rows and 7 columns",
      },
      {
        src: "/projects/Innovate-solutions/6.png",
        alt: "null_df filtering null salary or hire_date and tagging quarantine_reason NULL_FIELD, 18 rows",
        caption: "Quarantine: 18 records with a null hire_date or salary tagged NULL_FIELD",
      },
      {
        src: "/projects/Innovate-solutions/7.png",
        alt: "INVALID_DF filtering salary below zero or equal to 9999999, 2 rows",
        caption: "Quarantine: 2 out-of-range salaries (negative and 9,999,999) isolated as INVALID_SALARY",
      },
      {
        src: "/projects/Innovate-solutions/8.png",
        alt: "quarantine_df created with unionByName showing 20 rows",
        caption: "Quarantine: both rule sets combined with unionByName into quarantine_df, 20 records",
      },
      {
        src: "/projects/Innovate-solutions/9.png",
        alt: "working_df created with a left_anti join on employee_id showing 312 rows",
        caption: "Working set: left_anti join removes quarantined employees, leaving 312 rows",
      },
      {
        src: "/projects/Innovate-solutions/10.png",
        alt: "dedup_df ordered by updated_at descending and dropping duplicates on employee_id, 307 rows",
        caption: "Deduplicate: latest updated_at kept per employee_id, 307 unique employees",
      },
      {
        src: "/projects/Innovate-solutions/11.png",
        alt: "Python function cal_tenure_grp classifying tenure as New, Established or Veteran",
        caption: "Reusable logic: cal_tenure_grp maps tenure to New, Established or Veteran",
      },
      {
        src: "/projects/Innovate-solutions/12.png",
        alt: "Python function Salary_band classifying salary as Junior, Mid or Senior",
        caption: "Reusable logic: Salary_band maps salary to Junior, Mid or Senior",
      },
      {
        src: "/projects/Innovate-solutions/13.png",
        alt: "enrich_df adding Hire_year, Tenure, Tenure_Group and Salary_band, 11 columns and 307 rows",
        caption: "Enrich: Hire_year, Tenure, Tenure_Group and Salary_band added (11 columns, 307 rows)",
      },
      {
        src: "/projects/Innovate-solutions/14.png",
        alt: "Left join with departments, transformed_at timestamp and name_prefix extraction, 16 columns",
        caption: "Join and stamp: department context joined, transformed_at added, name prefixes split out (16 columns)",
      },
      {
        src: "/projects/Innovate-solutions/15.png",
        alt: "hash_algo using sha2 256, Mask_sal function and protected_df dropping employee_name and salary",
        caption: "Protect: SHA-256 name hash and salary mask applied, clear-text columns dropped",
      },
      {
        src: "/projects/Innovate-solutions/16.png",
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
    {
    slug: "crestview-finance-fx-rates-warehouse-ingestion",
    title: "Crestview Finance: Daily FX Rates from a Public API into the Fabric Warehouse",
    status: "in-progress",
    featured: true,
    summary:
      "A warehouse-native API ingestion in Microsoft Fabric. A pipeline Web Activity calls the Frankfurter API for daily ECB exchange rates, passes the JSON response to a stored procedure, and T-SQL OPENJSON shreds the nested payload into one clean row per currency in a warehouse table.",
    businessProblem:
      "A lender reporting every exposure in US dollars was copying exchange rates from public websites into Excel once a month. Reports ran on conversion rates that could be four weeks old, a 5% overnight euro move (about $55M on a $1.1B euro book) went unseen for weeks, and two risk analysts spent roughly 16 hours a month finding and typing rates.",
    objective:
      "Replace the manual monthly copy with an automated daily feed: one table in the Fabric warehouse that every team reads, loaded by a pipeline with no manual rate entry and parsed in T-SQL inside the warehouse.",
    dataset: {
      source:
        "Frankfurter API (https://api.frankfurter.dev/v1/), which publishes European Central Bank reference rates. Request used: latest?base=USD&symbols=EUR,JPY,GBP,AUD.",
      structure:
        "One nested JSON payload per day (date, base currency and a rates object holding one value per currency), shredded into one row per currency in Staging.CurrencyRates.",
      fields: ["RateDate", "BaseCurrency", "TargetCurrency", "RATEVALUE"],
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Data Pipeline",
      "Fabric Warehouse",
      "T-SQL",
      "OPENJSON",
      "Stored Procedures",
      "REST API",
      "JSON",
    ],
    architecture: [
      { label: "Frankfurter API", icon: "api", detail: "ECB daily rates" },
      { label: "Web Activity", icon: "ingestion", detail: "FX_API (GET)" },
      { label: "sp_InsertRates", icon: "transform", detail: "OPENJSON shredding" },
      { label: "Staging.CurrencyRates", icon: "warehouse", detail: "One row per currency" },
    ],
    concepts: [
      "Warehouse-native API ingestion",
      "Shredding nested JSON in T-SQL with OPENJSON and JSON_VALUE",
      "Passing a Web Activity's output to a stored procedure with @string(activity('FX_API').output)",
      "Activity chaining: the load runs only if the API call succeeds",
      "Parsing inside the warehouse instead of reshaping data in the pipeline",
    ],
    dataQualityTechniques: [
      "Typed target schema: DATE, CHAR(3) and DECIMAL(20,6) columns enforce structure on load",
      "Success-only chaining so the stored procedure never runs on a failed API call",
      "Post-load validation query to confirm the rows that landed",
    ],
    implementation: [
      "Created the Staging schema and the Staging.CurrencyRates table in the warehouse (RateDate DATE, BaseCurrency CHAR(3), TargetCurrency CHAR(3), RATEVALUE DECIMAL(20,6)).",
      "Wrote the stored procedure Staging.sp_InsertRates, which takes the whole API response as one NVARCHAR(MAX) parameter (@SampleData).",
      "Inside the procedure, read the date and base currency with JSON_VALUE and expanded the rates object with OPENJSON, so each currency key and value becomes its own row.",
      "Built the pipeline Currency_FX_Umesh with a Web activity (FX_API) that calls the Frankfurter API with GET on a Web connection, requesting latest rates against USD.",
      "Added a Stored procedure activity chained on success of the Web activity, calling [Staging].[sp_InsertRates] with SampleData set to @string(activity('FX_API').output).",
      "Ran the pipeline, confirmed both activities succeeded, and queried the table to check the loaded rows.",
    ],
    screenshots: [
      {
        src: "/projects/Crestview/4.png",
        alt: "Warehouse SQL editor showing the sp_InsertRates stored procedure that parses JSON with JSON_VALUE and OPENJSON",
        caption: "Stored procedure: Staging.sp_InsertRates receives the payload as one string and shreds it with JSON_VALUE and OPENJSON",
      },
      {
        src: "/projects/Crestview/1.png",
        alt: "Web activity FX_API settings with a GET request to a relative URL requesting latest rates against USD",
        caption: "Web activity: FX_API calls the Frankfurter API with GET, requesting the latest rates against USD",
      },
      {
        src: "/projects/Crestview/2.png",
        alt: "Stored procedure activity settings calling Staging.sp_InsertRates with SampleData set to a string of the FX_API output",
        caption: "Stored procedure activity: passes the Web activity's response in as SampleData using @string(activity('FX_API').output)",
      },
      {
        src: "/projects/Crestview/5.png",
        alt: "Pipeline run output showing FX_API and Stored procedure1 both succeeded",
        caption: "Successful run: FX_API (12s) then Stored procedure1 (8s) completed in sequence",
      },
      {
        src: "/projects/Crestview/3.png",
        alt: "SQL query selecting from Staging.CurrencyRates returning four rows of USD exchange rates for 2026-10-16",
        caption: "Validation: SELECT from Staging.CurrencyRates returns 4 rows for 2026-10-16, one rate per target currency",
      },
    ],
    transformations: [
      {
        title: "Shred the nested JSON payload into rows",
        description:
          "The API returns one nested document per day. JSON_VALUE pulls the single date and base currency, and OPENJSON expands the rates object so every currency key and rate value becomes its own row in the target table.",
        language: "sql",
        code: `CREATE PROC Staging.sp_InsertRates
  @SampleData NVARCHAR(MAX)
AS
BEGIN
  INSERT INTO Staging.CurrencyRates
    (RateDate, BaseCurrency, TargetCurrency, RATEVALUE)
  SELECT
    CAST(JSON_VALUE(@SampleData, '$.date') AS DATE) AS RateDate,
    JSON_VALUE(@SampleData, '$.base')               AS BaseCurrency,
    x.[key]                                         AS TargetCurrency,
    x.[value]                                       AS RateValue
  FROM OPENJSON(@SampleData, '$.rates') AS x;
END`,
      },
    ],
    dataQuality: {
      schemaValidation:
        "Target columns are typed (DATE, CHAR(3), DECIMAL(20,6)), so the date and rate values are cast to the correct types when loaded.",
      dataValidation:
        "After the run, a SELECT on Staging.CurrencyRates returned 4 rows for 2026-10-16.",
    },
    learnings: [
      "Parsing a nested API payload inside a relational warehouse with OPENJSON",
      "Handing a Web Activity's run-time output to a stored procedure as a single string parameter",
      "Keeping raw-to-rows parsing in one place (the stored procedure) rather than in the pipeline",
    ],
    results: [
      "Daily feed pipeline ran end to end: FX_API Web activity (12s), then sp_InsertRates (8s).",
      "Staging.CurrencyRates returned 4 rows for 2026-10-16 (AUD 1.437000, EUR 0.888650 and GBP 0.749890 visible in the result grid).",
    ],
    // github: "https://github.com/your-username/your-repo",
  },

    {
    slug: "Metropolis-inbox-dynamic-router",
    title: "City of Metropolis: Dynamic Inbox Router",
    status: "in-progress",
    featured: true,
    summary:
      "A single Microsoft Fabric pipeline that triages a shared department inbox with no manual step. It lists every file, loops over them, routes Police, Parking and 311 files to their Bronze folders by file-name pattern, quarantines anything unrecognised, archives the file and clears the inbox. Based on bootcamp case study FAB03.",
    businessProblem:
      "Files from Police, Transport and 311 land in one inbox, and an engineer reads each file name and starts ingestion by hand. Nothing marks a file as processed, so files get loaded twice, missed, or sit in the inbox forever. In the bootcamp scenario, an audit found nearly 12% of expected files were loaded twice or missed because of naming deviations.",
    objective:
      "Replace manual triage with one metadata-driven router: every file that enters the inbox ends the cycle in a Bronze folder or in quarantine, and the inbox is left empty.",
    dataset: {
      source:
        "28 files in the CS_3/Metropolis_inbox folder of the LH_Umeshsahu Lakehouse, sent by the Police, Transport and 311 departments.",
      structure:
        "Binary files routed by name. The contract is one file-name pattern per department; anything that matches none is treated as unrecognised.",
      fields: [
        "Police_Incidents_YYYYMMDD_n.csv",
        "Parking_Violations_YYYYMMDD_n.json",
        "311_Service_Requests_YYYYMMDD_n.csv",
      ],
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Data Pipeline",
      "Lakehouse",
      "Pipeline expressions",
    ],
    architecture: [
      { label: "Metropolis Inbox", icon: "file", detail: "CS_3 folder" },
      { label: "Get Metadata", icon: "ingestion", detail: "List files" },
      { label: "ForEach + Switch", icon: "validation", detail: "Route by file name" },
      { label: "Bronze / Quarantine", icon: "bronze", layer: "bronze", detail: "Per department" },
      { label: "Archive", icon: "storage", detail: "Copy processed file" },
      { label: "Clear Inbox", icon: "transform", detail: "Delete after copy" },
    ],
    concepts: [
      "Metadata-driven control flow: Get Metadata feeds a ForEach loop",
      "Dynamic routing with a Switch and a pipeline expression on @item().name",
      "Quarantine on the Default path instead of dropping unknown files",
      "Binary copy so one Copy activity handles any file format",
      "Archive then delete, chained on success",
    ],
    dataQualityTechniques: [
      "File-name pattern check (prefix and extension) before a file is routed",
      "Quarantine of unrecognised files instead of dropping them",
      "Archive then delete, so a processed file cannot be loaded twice",
    ],
    implementation: [
      "Organised the CS_3 Lakehouse folder with the Metropolis inbox, a Bronze folder for each of the three departments, an archive folder and a quarantine folder.",
      "Added a Get Metadata activity (Get File Names) on the inbox in Binary format, returning the child items (every file name).",
      "Passed that list to a ForEach activity (Iterate) so each file is handled on its own. Sequential is off, with a batch count of 50.",
      "Inside the loop, added a Switch whose expression lowercases the file name and checks the department prefix and file extension, returning police, parking, 311 or other.",
      "In each of the three department cases, added a Copy activity from the inbox (file name set to @item().name) to that department's Bronze folder, with Binary at both ends.",
      "In the Default case, added a Copy activity that sends the file to the quarantine folder.",
      "After the Switch succeeds, an archive Copy activity copies the file to the archive folder, then a Delete activity removes it from the inbox.",
    ],
    screenshots: [
      {
        src: "/projects/Metropolis/1.png",
        alt: "Lakehouse explorer showing the CS_3 folder with the inbox holding 28 files beside the Bronze, archive and quarantine folders",
        caption: "Starting state: the inbox holds 28 files from all departments, next to the Bronze, archive and quarantine folders",
      },
      {
        src: "/projects/Metropolis/2.png",
        alt: "Get Metadata activity settings reading the CS_3 inbox folder in Binary format with a Child items field",
        caption: "List: Get File Names reads the inbox as Binary and returns every file name for the loop",
      },
      {
        src: "/projects/Metropolis/3.png",
        alt: "ForEach activity settings iterating over the output of Get File Names with a batch count of 50, containing Switch, archive copy and Delete",
        caption: "Loop: ForEach runs the Switch, archive Copy and Delete for each file, up to 50 in parallel",
      },
      {
        src: "/projects/Metropolis/4.png",
        alt: "Switch activity with a Default case for quarantine and cases for police, parking and 311",
        caption: "Route: a Switch with one case per department and a Default case that handles everything else",
      },
      {
        src: "/projects/Metropolis/5.png",
        alt: "Pipeline expression builder showing nested if functions that check the lowercase file name prefix and extension",
        caption: "Routing rule: the expression checks the department prefix and extension and returns police, parking, 311 or other",
      },
      {
        src: "/projects/Metropolis/6.png",
        alt: "Police Copy activity source using file path type File path with the inbox folder and a file name of @item().name",
        caption: "Police branch source: copies the current file from the inbox using @item().name, Binary format",
      },
      {
        src: "/projects/Metropolis/7.png",
        alt: "Police Copy activity destination writing to the police Bronze folder in Binary format",
        caption: "Police branch destination: writes the file to the police Bronze folder",
      },
      {
        src: "/projects/Metropolis/8.png",
        alt: "Parking Copy activity source using the inbox folder and a file name of @item().name",
        caption: "Parking branch source: copies the current file from the inbox",
      },
      {
        src: "/projects/Metropolis/9.png",
        alt: "Parking Copy activity destination writing to the parking Bronze folder in Binary format",
        caption: "Parking branch destination: writes the file to the parking Bronze folder",
      },
      {
        src: "/projects/Metropolis/10.png",
        alt: "311 Copy activity source using the inbox folder and a file name of @item().name",
        caption: "311 branch source: copies the current file from the inbox",
      },
      {
        src: "/projects/Metropolis/11.png",
        alt: "311 Copy activity destination writing to the 311 Bronze folder in Binary format",
        caption: "311 branch destination: writes the file to the 311 Bronze folder",
      },
      {
        src: "/projects/Metropolis/12.png",
        alt: "Quarantine Copy activity source in the Default case using the inbox folder and a file name of @item().name",
        caption: "Default branch source: any file that matched no pattern is picked up from the inbox",
      },
      {
        src: "/projects/Metropolis/13.png",
        alt: "Quarantine Copy activity destination writing to the quarantine folder in Binary format",
        caption: "Default branch destination: the unrecognised file is written to the quarantine folder",
      },
      {
        src: "/projects/Metropolis/14.png",
        alt: "Archive Copy activity source reading the current file from the inbox folder",
        caption: "Archive step source: after the Switch succeeds, the same file is read from the inbox",
      },
      {
        src: "/projects/Metropolis/15.png",
        alt: "Archive Copy activity destination writing to the Archived folder in Binary format",
        caption: "Archive step destination: the file is copied to the archive folder",
      },
      {
        src: "/projects/Metropolis/16.png",
        alt: "Delete activity source pointing at the inbox folder with a file name of @item().name",
        caption: "Clean-up: the Delete activity removes the file from the inbox once it has been archived",
      },
    ],
    dataQuality: {
      dataValidation:
        "A file is routed only if its lowercase name starts with the department prefix and ends with the expected extension (.csv or .json).",
      invalidRecords:
        "A file whose name matches no pattern is treated as unrecognised and is not loaded to any Bronze folder.",
      quarantine:
        "The Default case copies unrecognised files to a quarantine folder for review instead of leaving them in the inbox or dropping them.",
    },
    challenges: [
      {
        challenge:
          "The routing Copy activity failed on its first run: the file name expression had been placed in the Connection field and the source used a wildcard path.",
        solution:
          "Selected the Lakehouse connection, switched the source to File path with the inbox folder and @item().name as the file name, and set both source and destination to Binary.",
      },
    ],
    learnings: [
      "Driving a pipeline from file metadata with Get Metadata and ForEach",
      "Using a Switch and a dynamic expression to route files by naming contract",
      "Why a quarantine path is needed to avoid unprocessed files piling up",
      "Chaining Delete after Copy on success so a failed copy never loses a file",
    ],
    // TODO: add a run-output screenshot, the folder counts after a run, and the schedule, then set status to "complete".
    // github: "https://github.com/your-username/your-repo",
  },
  {
    slug: "north-meridian-retail-unified-commerce-analytics",
    title: "NorthMeridian Retail Group: Unified Commerce Analytics",
    status: "completed",
    featured: true,
    summary:
      "A full Medallion lift for a multi-channel retail group stuck on five-way SQL joins and three copies of a region CSV. Four Azure SQL tables and a RegionMapping CSV flow through Bronze, Silver and a Gold star schema — Dim_Customers, Dim_Products, Dim_Date and a pre-aggregated Fact_Sales — orchestrated by a Master Pipeline that runs daily at 06:00 and finishes before the 08:00 reporting window.",
    businessProblem:
      "Every revenue-by-region report required five joins across the tills' production Azure SQL database. Three versions of the state-to-region CSV were in circulation on analyst desktops. Three analysts spent approximately 36 hours a week rewriting joins and patching 14 saved scripts. Reports were stale before they reached the Head of Sales.",
    objective:
      "North Meridian Retail Group sells online and in store, with online volume growing double digits a year. Leadership needed analytics moved to a Fabric Lakehouse without touching the transaction flow, with yesterday's sales available before 08:00 every morning. The solution had to be replayable from source, idempotent, and give the Sales team sole ownership of the revenue definition.",
    dataset: {
      source: "Azure SQL Database (NorthMeridianRetail schema): Sales (4,000 rows, SalesID 50001–54000), Orders (4,000 rows, OrderID 70000–73999), Customers (1,000 rows) and Products (200 rows). Plus RegionMapping.csv (20 rows mapping StateCode to Northeast, South, Midwest or West) uploaded to Lakehouse Files.",
      structure: "Sales: SalesID, CustomerID, ProductID, Quantity, SalesDate. Orders: OrderID, SalesID, Status, ShipDate. Customers: CustomerID, FirstName, LastName, Email, City, StateCode. Products: ProductID, ProductName, Category, UnitPrice. Gold contract: Dim_Customers (CustomerKey surrogate), Dim_Products (ProductKey surrogate), Dim_Date (DateKey yyyyMMdd), Fact_Sales aggregated by DateKey × CustomerKey × ProductKey × Status.",
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Data Pipeline",
      "Azure SQL Database",
      "Lakehouse",
      "Delta Lake",
      "PySpark",
      "Spark SQL",
      "Power BI",
      "Medallion Architecture",
    ],
    architecture: [
      { label: "Azure SQL (4 tables)", icon: "file" },
      { label: "Batch Pipelines 1 & 2", icon: "ingestion", detail: "ControlTable slices" },
      { label: "Bronze Layer", icon: "storage", layer: "bronze", detail: "Raw, read-only" },
      { label: "Incr. Pipeline 3 + Dim Pipeline 4", icon: "ingestion", detail: "Watermark + full refresh" },
      { label: "Data_cleaning Notebook", icon: "transform", detail: "Bronze → Silver" },
      { label: "Silver Layer", icon: "storage", layer: "silver", detail: "Customers, Products, Sales" },
      { label: "Silver_to_Gold Notebook", icon: "transform", detail: "Star schema" },
      { label: "Gold Star Schema", icon: "curated", layer: "gold", detail: "Fact + 3 Dims" },
      { label: "Power BI Semantic Model", icon: "quality", detail: "Direct Lake" },
    ],
    concepts: [
      "Medallion architecture: Bronze keeps raw source data for full replay; Silver applies join and enrichment logic; Gold delivers the analytical contract",
      "Control-table-driven batching: Sales and Orders each split into four 1,000-row SalesID/OrderID slices so a failed slice reruns without reloading the others",
      "Watermark-based incremental loading: daily pipeline loads only rows added since the last successful run; an ID watermark is safer than LastModifiedDate because IDs are immutable",
      "Idempotent pipelines at every layer: overwrite semantics on Bronze dimensions, watermark advancement only on Copy success, and overwrite on Silver and Gold ensure reruns add nothing",
      "Star schema with surrogate keys: monotonically_increasing_id() generates Dim keys; Fact_Sales pre-aggregates by DateKey × CustomerKey × ProductKey × Status for VertiPaq columnar compression",
      "Region mapping denormalised into Dim_Customers: one authoritative CSV replaces three desktop copies and three diverging region totals",
      "Master Pipeline with success-chain ordering: PL_Cust_Products_load → PL_Orders_Sales_Incr_load → Data_cleaning notebook → Silver_to_Gold notebook → Semantic model refresh",
    ],
    dataQualityTechniques: [
      "SUM(TotalSalesAmount) in Gold reconciles to the cent against SUM(Quantity × UnitPrice) in Bronze — $0.00 variance allowed",
      "OrderCount in Fact_Sales sums to the Silver_Sales row count, confirming no sales are gained or lost in aggregation",
      "A second incremental run with no new source rows adds zero rows to any layer, proving idempotency end to end",
      "UnitPrice rounded to 2 decimal places in Silver before being carried into Gold to prevent floating-point accumulation errors in TotalSalesAmount",
      "Left join used for all Silver joins so no Sales row is silently dropped when a Product or Order key does not match",
      "RegionMapping joined in Silver and denormalised into Dim_Customers so there is one authoritative source for region logic",
    ],
    implementation: [
      "Uploaded RegionMapping.csv (20 state-to-region rows) to the Lakehouse Files area.",
      "Built PL_Cust_Products_load with two Copy activities — Load_Customers and Load_Products — reading from the NorthMeridianRetail schema in Azure SQL and landing raw data in Bronze Delta tables with Overwrite action.",
      "Created NorthMeridian.cfg_Watermark Delta table in NB_Watermark_id notebook (TableName STRING, WatermarkValue BIGINT), seeding it with the highest SalesID/OrderID already in Bronze after the batch loads.",
      "Built PL_Orders_Sales_Batch_Load with a ControlTable (one row per 1,000-row slice) and a ForEach activity that drives a Copy activity per slice, appending Sales and Orders rows to Bronze.",
      "Built PL_Orders_Sales_Incr_load: Lookup activity reads cfg_Watermark, Copy activity filters source rows with SalesID / OrderID greater than the watermark and appends to Bronze, Update_watermark notebook advances the watermark only on Copy success.",
      "Data_cleaning notebook (Bronze to Silver): read Bronze Customers, left-joined RegionMapping on StateCode, concatenated FirstName and LastName into FullName, wrote Silver_Customers (overwrite). Read Bronze Products, rounded UnitPrice to 2 decimals, wrote Silver_Products (overwrite). Read Bronze Sales and Orders, left-joined on salesid, left-joined Products on productid, computed TotalSalesAmount = round(Quantity × UnitPrice, 2), wrote Silver_sales (overwrite).",
      "Silver_to_Gold notebook: generated Dim_Customers with monotonically_increasing_id() as CustomerKey and RegionName denormalised. Generated Dim_Products with ProductKey surrogate. Built Dim_Date as a date spine from the first to the last SalesDate with DateKey in yyyyMMdd format and Year/Quarter attributes. Aggregated Silver_sales joined to all three dimensions into Fact_Sales (TotalSalesAmount, TotalQuantity, OrderCount per DateKey × CustomerKey × ProductKey × Status).",
      "Created a Direct Lake Power BI Semantic Model on Gold, relating Fact_Sales to each dimension on its surrogate key one-to-many.",
      "Built Power BI report with a line chart of TotalSalesAmount by Date and a bar chart of the top 10 products by revenue.",
      "Assembled Master_pipeline: CUST_PROD_LOAD (PL_Cust_Products_load) → SALES_ORDERS_L (PL_Orders_Sales_Incr_load) → Clean_data (Data_cleaning notebook) → Silver_to_Gold notebook → Semantic model refresh1, each step chained on success of the previous.",
      "Scheduled Master_pipeline with a daily trigger at 06:00 to meet the 08:00 reporting SLA.",
    ],
    screenshots: [
      {
        src: "/projects/NorthMeridian/1.png",
        alt: "PL_Cust_Products_load pipeline canvas showing Load_Customers and Load_Products copy activities",
        caption: "Pipeline 4 (Dimensions): PL_Cust_Products_load with two Copy activities that land Customers and Products from Azure SQL into Bronze Delta tables",
      },
      {
        src: "/projects/NorthMeridian/2.png",
        alt: "Load_Customers Copy activity source settings reading NorthMeridianRetail.Customers from Azure SQL",
        caption: "Load_Customers source: reads the full NorthMeridianRetail.Customers table from the msfabricbootcamp Azure SQL database",
      },
      {
        src: "/projects/NorthMeridian/3.png",
        alt: "Load_Customers Copy activity destination settings writing to the Bronze Customers Delta table with Overwrite",
        caption: "Load_Customers destination: raw Customers data lands in the Lakehouse Bronze layer with Overwrite, preserving full-reload idempotency",
      },
      {
        src: "/projects/NorthMeridian/4.png",
        alt: "Load_Products Copy activity source settings reading NorthMeridianRetail.Products from Azure SQL",
        caption: "Load_Products source: reads all 200 rows from NorthMeridianRetail.Products, including UnitPrice which drives TotalSalesAmount in Gold",
      },
      {
        src: "/projects/NorthMeridian/5.png",
        alt: "Load_Products Copy activity destination settings writing to the Bronze Products Delta table with Overwrite",
        caption: "Load_Products destination: raw Products land in Bronze with Overwrite so the dimension is always fully refreshed",
      },
      {
        src: "/projects/NorthMeridian/6.png",
        alt: "NorthMeridian.cfg_Watermark Delta table created in NB_Watermark_id notebook showing TableName and WatermarkValue columns",
        caption: "Watermark table: NB_Watermark_id notebook creates NorthMeridian.cfg_Watermark and seeds the initial watermark after the batch loads complete",
      },
      {
        src: "/projects/NorthMeridian/7.png",
        alt: "ControlTable rows showing SalesID and OrderID slice boundaries for the batch load pipelines",
        caption: "ControlTable: one row per 1,000-row slice (SalesID 50001–54000 and OrderID 70000–73999) so a failed slice reruns without reloading the others",
      },
      {
        src: "/projects/NorthMeridian/8.png",
        alt: "PL_Orders_Sales_Batch_Load pipeline canvas with a ForEach activity looping over ControlTable rows",
        caption: "Pipeline 1 & 2 (Batch): ForEach iterates over ControlTable rows, firing one Copy per slice to append Sales and Orders to Bronze",
      },
      {
        src: "/projects/NorthMeridian/9.png",
        alt: "Copy activity inside ForEach reading a SalesID-range slice from Azure SQL using a parameterised query",
        caption: "Batch Copy source: parameterised query filters by SalesID range from the current ControlTable row, loading one 1,000-row slice at a time",
      },
      {
        src: "/projects/NorthMeridian/10.png",
        alt: "Copy activity destination inside ForEach appending the Sales slice to the Bronze Sales Delta table",
        caption: "Batch Copy destination: Append action adds each slice to Bronze Sales without touching previously loaded slices",
      },
      {
        src: "/projects/NorthMeridian/11.png",
        alt: "PL_Orders_Sales_Batch_Load successful run history showing all eight slices succeeded",
        caption: "Batch run complete: all eight slices (four Sales, four Orders) succeeded, loading the full 4,000-row history into Bronze",
      },
      {
        src: "/projects/NorthMeridian/12.png",
        alt: "PL_Orders_Sales_Incr_load pipeline canvas showing Lookup, Copy and Update_watermark notebook chained on success",
        caption: "Pipeline 3 (Incremental): Lookup reads the watermark, Copy appends only rows with SalesID/OrderID above it, Update_watermark notebook advances the mark on success",
      },
      {
        src: "/projects/NorthMeridian/13.png",
        alt: "Lookup activity settings reading NorthMeridian.cfg_Watermark with First row only enabled",
        caption: "Lookup activity: reads the current WatermarkValue from cfg_Watermark (first row only) to define the lower bound of the incremental filter",
      },
      {
        src: "/projects/NorthMeridian/14.png",
        alt: "Incremental Copy activity source settings filtering Sales rows with SalesID greater than the Lookup watermark",
        caption: "Incremental Copy source: WHERE SalesID > @{activity('Lookup').output.firstRow.WatermarkValue} ensures only net-new rows are loaded on each daily run",
      },
      {
        src: "/projects/NorthMeridian/15.png",
        alt: "Update_watermark notebook updating cfg_Watermark to the maximum SalesID seen in the current run",
        caption: "Update_watermark notebook: advances cfg_Watermark to the highest ID loaded, runs only after Copy succeeds so a failed load is retried in full next run",
      },
      {
        src: "/projects/NorthMeridian/16.png",
        alt: "Data_cleaning notebook reading Bronze Customers into customers_df and displaying sample rows",
        caption: "Bronze to Silver – Customers: Bronze Customers table read into customers_df; 1,000 rows with StateCode as the join key to RegionMapping",
      },
      {
        src: "/projects/NorthMeridian/17.png",
        alt: "RegionMapping.csv loaded from Lakehouse Files and joined to customers_df on StateCode",
        caption: "Region join: RegionMapping.csv (20 state-to-region rows) loaded and left-joined on StateCode, adding the single authoritative RegionName to every customer row",
      },
      {
        src: "/projects/NorthMeridian/18.png",
        alt: "Silver_Customers_df with FullName derived from FirstName and LastName and RegionName denormalised",
        caption: "Silver Customers: FirstName and LastName concatenated into FullName; RegionName denormalised from the CSV, eliminating the three divergent desktop copies",
      },
      {
        src: "/projects/NorthMeridian/19.png",
        alt: "Silver_Customers_df written to LH_Umeshsahu.NorthMeridian.Silver_Customers with overwrite mode",
        caption: "Silver_Customers written to Delta with overwrite so each run produces a fresh, clean dimension that matches the current source",
      },
      {
        src: "/projects/NorthMeridian/20.png",
        alt: "Data_cleaning notebook reading Bronze Products into Products_df and displaying UnitPrice column",
        caption: "Bronze to Silver – Products: Bronze Products read into Products_df; UnitPrice rounded to 2 decimal places before Silver write to prevent floating-point accumulation in Fact_Sales",
      },
      {
        src: "/projects/NorthMeridian/21.png",
        alt: "Products_df with UnitPrice rounded to 2 decimals displayed before writing Silver_Products",
        caption: "UnitPrice rounding: round(col('UnitPrice'), 2) applied so TotalSalesAmount in Gold reconciles to the cent against Bronze",
      },
      {
        src: "/projects/NorthMeridian/22.png",
        alt: "Silver_Products written to LH_Umeshsahu.NorthMeridian.Silver_Products with overwrite mode confirmed",
        caption: "Silver_Products written to Delta (overwrite); all 200 products available for the Gold join without any silent row loss",
      },
      {
        src: "/projects/NorthMeridian/23.png",
        alt: "Data_cleaning notebook reading Bronze Sales and Orders tables into Sales_df and Orders_df",
        caption: "Bronze to Silver – Sales: Bronze Sales (4,000 rows) and Orders (4,000 rows) read into separate DataFrames ready for the three-way join",
      },
      {
        src: "/projects/NorthMeridian/24.png",
        alt: "Sales_df joined to Orders_df on salesid and then to Products_df on productid with left joins",
        caption: "Three-way join: Sales left-joined to Orders on salesid, then to Products on productid — left joins ensure no sale is silently dropped if a key is missing",
      },
      {
        src: "/projects/NorthMeridian/25.png",
        alt: "TotalSalesAmount computed as round(Quantity times UnitPrice, 2) on the joined Silver_Sales DataFrame",
        caption: "TotalSalesAmount derived: round(col('Quantity') * col('Unitprice'), 2) computed on the joined frame; this is the measure Gold reconciles to the cent",
      },
      {
        src: "/projects/NorthMeridian/26.png",
        alt: "Silver_to_Gold notebook generating Dim_Customers with monotonically_increasing_id surrogate keys",
        caption: "Dim_Customers: surrogate CustomerKey generated with monotonically_increasing_id(); CustomerID retained as natural key for reconciliation; RegionName carried through from Silver",
      },
      {
        src: "/projects/NorthMeridian/27.png",
        alt: "Silver_to_Gold notebook generating Dim_Products with ProductKey surrogates and UnitPrice",
        caption: "Dim_Products: surrogate ProductKey assigned; ProductID kept as natural key; UnitPrice and Category carried into Gold for drill-down analysis",
      },
      {
        src: "/projects/NorthMeridian/28.png",
        alt: "Dim_Date generated as a date spine from the first to last SalesDate with DateKey in yyyyMMdd format",
        caption: "Dim_Date: continuous date spine generated between the earliest and latest SalesDate; DateKey formatted as yyyyMMdd integer; Year and Quarter attributes added",
      },
      {
        src: "/projects/NorthMeridian/29.png",
        alt: "Fact_Sales aggregated by DateKey, CustomerKey, ProductKey and Status with TotalSalesAmount, TotalQuantity and OrderCount",
        caption: "Fact_Sales: Silver_Sales joined to all three dimensions and pre-aggregated by DateKey × CustomerKey × ProductKey × Status; TotalSalesAmount, TotalQuantity and OrderCount as measures",
      },
      {
        src: "/projects/NorthMeridian/30.png",
        alt: "Data_cleaning notebook Silver_Products written and Silver_Sales join beginning, showing Products_df.write.saveAsTable Silver_Products and start of silver_Sales_df join code",
        caption: "Data_cleaning notebook: Silver_Products saved (9 sec); Silver_Sales section begins — Sales joined to Orders on salesid, then to Products on productid, with TotalSalesAmount computed",
      },
      {
        src: "/projects/NorthMeridian/31.png",
        alt: "Silver_Sales_df join completed and written to LH_Umeshsahu.NorthMeridian.Silver_sales with overwrite mode in 5 seconds",
        caption: "Silver_sales saved: three-way join confirmed (2 sec 303 ms) and written to NorthMeridian.Silver_sales with overwrite in 5 sec 813 ms",
      },
      {
        src: "/projects/NorthMeridian/32.png",
        alt: "Master_pipeline canvas showing CUST_PROD_LOAD invoking PL_Cust_Products_load as the first step, settings pane open",
        caption: "Master_pipeline — step 1: CUST_PROD_LOAD invokes PL_Cust_Products_load (Fabric type, Group 6D workspace) to refresh Customers and Products into Bronze",
      },
      {
        src: "/projects/NorthMeridian/33.png",
        alt: "Master_pipeline with SALES_ORDERS_L activity selected, settings showing Pipeline equals PL_Orders_Sales_Incr_load",
        caption: "Master_pipeline — step 2: SALES_ORDERS_L invokes PL_Orders_Sales_Incr_load after CUST_PROD_LOAD succeeds, appending only net-new Sales and Orders rows to Bronze",
      },
      {
        src: "/projects/NorthMeridian/34.png",
        alt: "Master_pipeline with Clean_data notebook activity selected, settings showing Notebook equals Data_cleaning in Group 6D workspace",
        caption: "Master_pipeline — step 3: Clean_data notebook activity runs Data_cleaning (Bronze → Silver) after the incremental load succeeds; no base parameters needed",
      },
      {
        src: "/projects/NorthMeridian/35.png",
        alt: "Master_pipeline with Silver_to_Gold notebook activity selected, settings showing Notebook equals Silver_to_Gold in Group 6D workspace",
        caption: "Master_pipeline — step 4: Silver_to_Gold notebook activity builds the four Gold tables (Dim_Customers, Dim_Products, Dim_Date, Fact_Sales) after Silver is clean",
      },
      {
        src: "/projects/NorthMeridian/36.png",
        alt: "Master_pipeline with Semantic model refresh1 activity selected, connection set to PowerBIDatasets Umesh.Sahu in Group 6D workspace",
        caption: "Master_pipeline — step 5: Semantic model refresh1 triggers the Direct Lake Power BI Semantic Model refresh after Gold is written, completing the daily chain before 08:00",
      },
    ],
    results: [
      "Full Medallion pipeline built end to end: Bronze batch loads (8 ControlTable slices), incremental daily load, Silver cleanse and join, Gold star schema and Power BI Semantic Model refresh, all chained in a single Master Pipeline.",
      "SUM(TotalSalesAmount) in Fact_Sales reconciles to the cent against SUM(Quantity × UnitPrice) in Bronze across all 4,000 sales rows.",
      "Region logic consolidated: RegionMapping.csv denormalised into Dim_Customers once, eliminating three diverging desktop copies and 36 analyst-hours per week of manual join work.",
      "Second incremental run with no new source rows adds zero rows to any layer, satisfying the idempotency acceptance check.",
      "Master Pipeline scheduled at 06:00 daily, delivering yesterday's sales to the Power BI report before the 08:00 reporting window.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
