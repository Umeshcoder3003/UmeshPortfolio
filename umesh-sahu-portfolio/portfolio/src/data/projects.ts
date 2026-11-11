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
        src: "/projects/granduer-properties/5.png",
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
    status: "in-progress",
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
    alt: "Configuring Azure SQL Database source connection for loading customer data in a Microsoft Fabric data pipeline",
    caption: "Source setup: connecting to the Azure SQL Database to fetch customer records for the ingestion pipeline"
  },
  {
    src: "/projects/NorthMeridian/2.png",
    alt: "Setting up the destination table NorthMeridian.Bronze_customer within the OneLake Lakehouse",
    caption: "Bronze destination: mapping customer data ingestion into the Lakehouse bronze layer table"
  },
  {
    src: "/projects/NorthMeridian/3.png",
    alt: "Configuring source parameters and database table connections for ingesting product records from Azure SQL",
    caption: "Product source: configuring database connections and query definitions for product data ingestion"
  },
  {
    src: "/projects/NorthMeridian/4.png",
    alt: "Defining destination settings and table action Overwrite for loading product data into NorthMeridian.Bronze_Products",
    caption: "Product destination: setting table overwrite actions to load product data into the bronze layer"
  },
  {
    src: "/projects/NorthMeridian/5.png",
    alt: "PySpark notebook cell creating the configuration watermark table NorthMeridian.cfg_Watermark to track incremental loads",
    caption: "Watermark table setup: initializing the configuration table in Spark SQL to manage incremental data tracking"
  },
  {
    src: "/projects/NorthMeridian/6.png",
    alt: "Overview of the incremental load data pipeline PL_Orders_Sales_Incr_load utilizing watermark filtering and lookup activities",
    caption: "Pipeline architecture: overview of the incremental load data pipeline using watermarks and lookups"
  },
  {
    src: "/projects/NorthMeridian/7.png",
    alt: "Pipeline expression builder configuring filter conditions using system variables and item watermark columns for order tracking",
    caption: "Expression builder: setting up conditional logic with watermark columns for order data filtering"
  },
  {
    src: "/projects/NorthMeridian/8.png",
    alt: "Configuring sales watermark filter conditions in the expression builder for incremental data ingestion",
    caption: "Sales filter logic: configuring expression parameters to filter incremental sales data streams"
  },
  {
    src: "/projects/NorthMeridian/9.png",
    alt: "Dynamic query configuration in the Copy Data activity pulling incremental order records based on the last watermark value",
    caption: "Dynamic query: fetching incremental order records using dynamic filter expressions"
  },
  {
    src: "/projects/NorthMeridian/10.png",
    alt: "Setting destination table mapping and properties for incremental order loads into the bronze lakehouse table",
    caption: "Order sink mapping: configuring target table mappings for incremental order ingestion"
  },
  {
    src: "/projects/NorthMeridian/11.png",
    alt: "Dynamic query setup for incremental sales data loading using watermark tracking values",
    caption: "Sales dynamic query: writing queries to extract updated sales rows based on watermark metadata"
  },
  {
    src: "/projects/NorthMeridian/12.png",
    alt: "Configuring destination settings for incremental sales data load into NorthMeridian.Bronze_Sales",
    caption: "Sales sink mapping: defining destination table properties for incremental sales data"
  },
  {
    src: "/projects/NorthMeridian/13.png",
    alt: "Adding the watermark update notebook activity at the completion of the incremental data pipeline",
    caption: "Pipeline completion: appending the watermark update notebook activity to conclude the run"
  },
  {
    src: "/projects/NorthMeridian/14.png",
    alt: "PySpark code snippet inside the watermark update notebook extracting max IDs and updating the cfg_Watermark table",
    caption: "Watermark update script: PySpark code calculating maximum IDs to advance watermark tracking values"
  },
  {
    src: "/projects/NorthMeridian/15.png",
    alt: "Executing batch load configuration and insert statements for batch data loading in Spark SQL",
    caption: "Batch execution: running Spark SQL insert commands to configure batch data loading steps"
  },
  {
    src: "/projects/NorthMeridian/16.png",
    alt: "Query execution and table validation for batch-loaded bronze orders and sales data",
    caption: "Data validation: executing queries to verify row counts and integrity of batch-loaded tables"
  },
  {
    src: "/projects/NorthMeridian/17.png",
    alt: "Overview of the PL_Orders_Sales_Batch_Load pipeline containing lookup activities, filters, and ForEach loops",
    caption: "Batch pipeline overview: inspecting the orchestrator pipeline structured with loops and filters"
  },
  {
    src: "/projects/NorthMeridian/18.png",
    alt: "Pipeline expression builder filtering batch load items for source tables matching ORDERS",
    caption: "Filter condition: configuring expressions to isolate batch configurations for orders"
  },
  {
    src: "/projects/NorthMeridian/19.png",
    alt: "Pipeline expression builder filtering batch load items for source tables matching SALES",
    caption: "Sales batch filter: isolating sales source configurations using pipeline expressions"
  },
  {
    src: "/projects/NorthMeridian/20.png",
    alt: "Configuring sequential batch execution and items array pointing to filtered sales outputs",
    caption: "Sequential iteration: mapping filtered sales outputs into the sequential ForEach loop"
  },
  {
    src: "/projects/NorthMeridian/21.png",
    alt: "Configuring dynamic query properties within the Orders Copy Data activity inside the ORDERS_FOREACH loop",
    caption: "Loop query configuration: assigning dynamic run queries to copy activities within the orders loop"
  },
  {
    src: "/projects/NorthMeridian/22.png",
    alt: "Setting destination sink table mappings for the orders copy activity in the batch pipeline",
    caption: "Orders sink setup: routing data outputs to the bronze orders table within the loop"
  },
  {
    src: "/projects/NorthMeridian/23.png",
    alt: "Configuring ForEach iterator settings for the sales batch load loop",
    caption: "Sales loop setup: binding sales filter outputs to the batch iteration items property"
  },
  {
    src: "/projects/NorthMeridian/24.png",
    alt: "Configuring source database query parameters for running dynamic queries inside batch data copy activities",
    caption: "Query parameters: setting source database options to evaluate dynamic SQL strings"
  },
  {
    src: "/projects/NorthMeridian/25.png",
    alt: "Configuring destination settings for the sales batch copy activity pointing to Bronze sales",
    caption: "Sales destination target: pointing the copy sink to the Bronze sales lakehouse table"
  },
  {
    src: "/projects/NorthMeridian/26.png",
    alt: "Data cleaning notebook initializing PySpark functions and creating DataFrames from bronze lakehouse tables and CSV region maps",
    caption: "Notebook initialization: loading PySpark functions and establishing base DataFrames from bronze and CSV sources"
  },
  {
    src: "/projects/NorthMeridian/27.png",
    alt: "Executing customer data transformations, joining customer data with region mapping tables, and selecting formatted columns",
    caption: "Customer transformation: cleaning customer records and performing left joins with region mapping data"
  },
  {
    src: "/projects/NorthMeridian/28.png",
    alt: "Displaying transformed customer data preview and persisting the cleaned DataFrame into the silver layer table silver_customer",
    caption: "Silver persistence: previewing transformed customer records and writing them to the silver layer"
  },
  {
    src: "/projects/NorthMeridian/29.png",
    alt: "Displaying product data preview with cleaned categories and unit prices in the Spark notebook",
    caption: "Product transformation: reviewing cleaned product categories and casted decimal unit prices"
  },
  {
    src: "/projects/NorthMeridian/30.png",
    alt: "Joining sales and orders DataFrames, calculating total sales amounts with rounded multiplications, and writing cleaned data to silver tables",
    caption: "Sales transformation: joining datasets, calculating total amounts, and persisting silver sales data"
  },
  {
    src: "/projects/NorthMeridian/31.png",
    alt: "Executing silver sales transformation notebook and saving the final processed DataFrame to NorthMeridian.Silver_sales",
    caption: "Silver table save: finalizing the execution block to store processed sales data into silver storage"
  },
     {
        src: "/projects/NorthMeridian/Screenshot (170).png",
        alt: "Silver_to_Gold PySpark notebook cell importing pyspark.sql.functions and reading Silver tables into DataFrames with display outputs",
        caption: "Silver-to-Gold Notebook Setup: reading Silver_customer, Silver_Products, and Silver_Sales tables into PySpark DataFrames",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (171).png",
        alt: "PySpark notebook command execution showing successful read of customer_df, Products_df, and Sales_df",
        caption: "DataFrame Inspection: successful execution of table reads from Lakehouse Delta storage",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (172).png",
        alt: "Silver_customer DataFrame display output showing customer attributes",
        caption: "Silver Customer Preview: inspecting raw customer records prior to dimension key assignment",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (173).png",
        alt: "Silver_customer table view in Lakehouse displaying customer_id, FullName, Email, City, and RegionName",
        caption: "Silver Customer Table View: verified customer data with denormalized region context",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (174).png",
        alt: "Silver Products table view displaying ProductID, ProductName, Category, and UnitPrice with unrounded floating-point decimals",
        caption: "Silver Products Inspection: inspecting unrounded UnitPrice values before Gold transformation",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (175).png",
        alt: "Silver Sales table view showing transactional columns including ProductID, SalesID, CustomerID, Quantity, SalesDate, OrderID, Status, and ShipDate",
        caption: "Silver Sales Table View: transactional event log ready for star schema aggregation",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (176).png",
        alt: "PySpark code generating Dim_Customers with monotonically_increasing_id surrogate keys and table preview",
        caption: "Dim_Customers Generation: assigning surrogate CustomerKey via monotonically_increasing_id() while retaining natural CustomerID and RegionName",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (177).png",
        alt: "PySpark code generating Dim_Products with surrogate keys and UnitPrice rounding to 2 decimal places",
        caption: "Dim_Products Generation: assigning ProductKey surrogates and rounding UnitPrice to 2 decimals to prevent floating-point accumulation",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (178).png",
        alt: "Dim_Products table view showing ProductKey, ProductID, ProductName, Category, and UnitPrice",
        caption: "Dim_Products Table View: 200 product records populated with surrogate keys and cleaned attributes",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (179).png",
        alt: "Dim_Products write command execution confirming successful save to NorthMeridianGold.Dim_Products table",
        caption: "Dim_Products Write: saving Dim_Products Delta table to the Gold layer in 5 seconds",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (180).png",
        alt: "PySpark code generating Dim_Date continuous date spine using sequence and explode functions",
        caption: "Dim_Date Spine Generation: building continuous calendar dates from minimum to maximum sales date",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (181).png",
        alt: "Dim_Date table generation code formatting DateKey as yyyyMMdd integer with Year and Quarter attributes",
        caption: "Dim_Date Attributes: formatting DateKey as integer yyyyMMdd and extracting Year and Quarter for time intelligence",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (182).png",
        alt: "PySpark code aggregating Fact_Sales by joining Silver sales with dimensions and grouping by DateKey, CustomerKey, ProductKey, and Status",
        caption: "Fact_Sales Aggregation: joining Silver sales with all three dimensions and computing TotalSalesAmount, OrderCount, and TotalQuantity",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (183).png",
        alt: "Fact_Sales table view and execution output showing aggregated measures and foreign keys",
        caption: "Fact_Sales Table View: successfully aggregated fact table saved to NorthMeridianGold.fact_sales",
      },
      {
        src: "/projects/NorthMeridian/Screenshot (184).png",
        alt: "Fabric OneLake explorer displaying NorthMeridian Gold star schema tables (dim_customers, dim_date, fact_sales)",
        caption: "Gold Star Schema Complete: OneLake explorer displaying fully populated dimensional model ready for Power BI Direct Lake",
      },
  {
    src: "/projects/NorthMeridian/32.png",
    alt: "Configuring the Master Pipeline Master_pipeline invocation activity for customer and product load PL_Cust_Products_load",
    caption: "Master pipeline step: orchestrating the customer and product loading pipeline activity"
  },
  {
    src: "/projects/NorthMeridian/33.png",
    alt: "Configuring the master pipeline invocation activity for sales and orders incremental load PL_Orders_Sales_Incr_load",
    caption: "Incremental orchestration: embedding the sales and orders incremental pipeline into the master workflow"
  },
  {
    src: "/projects/NorthMeridian/34.png",
    alt: "Setting up the data cleaning notebook step Clean_data sequentially within the master orchestration pipeline",
    caption: "Cleaning notebook task: scheduling the data cleaning notebook execution after ingestion stages"
  },
  {
    src: "/projects/NorthMeridian/35.png",
    alt: "Configuring the Silver-to-Gold transformation notebook step Silver_to_Gold in the master data engineering pipeline",
    caption: "Gold transformation task: adding the silver-to-gold modeling notebook to the master pipeline"
  },
  {
    src: "/projects/NorthMeridian/36.png",
    alt: "Adding and configuring the Semantic Model Refresh activity at the end of the master pipeline workflow",
    caption: "Semantic model refresh: triggering automatic semantic model updates upon master pipeline completion"
  },
  {
    src: "/projects/NorthMeridian/37.png",
    alt: "Power BI reporting dashboard visualizing sales amounts by region, category, and dimensions using the star schema data model",
    caption: "Power BI reporting: visualizing core business metrics and sales aggregations via star schema models"
  }
    ],
    results: [
      "Full Medallion pipeline built end to end: Bronze batch loads (8 ControlTable slices), incremental daily load, Silver cleanse and join, Gold star schema and Power BI Semantic Model refresh, all chained in a single Master Pipeline.",
      "SUM(TotalSalesAmount) in Fact_Sales reconciles to the cent against SUM(Quantity × UnitPrice) in Bronze across all 4,000 sales rows.",
      "Region logic consolidated: RegionMapping.csv denormalised into Dim_Customers once, eliminating three diverging desktop copies and 36 analyst-hours per week of manual join work.",
      "Second incremental run with no new source rows adds zero rows to any layer, satisfying the idempotency acceptance check.",
      "Master Pipeline scheduled at 06:00 daily, delivering yesterday's sales to the Power BI report before the 08:00 reporting window.",
    ],
  },
    {
    slug: "telco-customer-data-standardisation-dataflow",
    title: "TelcoPrime: Customer Data Trust Transformation with Dataflow Gen2",
    status: "in-progress",
    featured: true,
    summary:
      "A low-code Microsoft Fabric Dataflow Gen2 that turns a raw customer CSV into a clean customer_silver table in the Lakehouse. Lookup files standardise states and street suffixes, addresses are split into street and unit, phone numbers are reduced to ten digits or null, and a quality flag marks which records pass every check. Based on bootcamp case study 10.",
    businessProblem:
      "TelcoPrime was building a Customer 360 view from customer records that had never been validated. Marketing mail came back undelivered and the churn model trained on location features it could not trust. In the bootcamp data profile, street suffixes had 11 spellings, states had 13 spellings, and about 11% of phone numbers (285 of 2,500) were unusable.",
    objective:
      "Build a repeatable, readable cleanse for 2,500 customer records: standardised street addresses with the unit split out, two-letter state codes, ten-digit phone numbers or null, and a data quality flag, written to one Lakehouse table that every team can read.",
    dataset: {
      source:
        "customer_bronze.csv plus two lookup files (state_lookup.csv and address_suffix_lookup.csv) in the Lakehouse folder Files/CS_10.",
      structure:
        "2,500 customer records (CustomerID 1001 to 3500) with Address, State and Phone, plus two lookups: Raw_State to Standard_State and Raw_Suffix to Standard_Suffix.",
      fields: ["CustomerID", "Address", "State", "Phone"],
    },
    technologies: [
      "Microsoft Fabric",
      "Dataflow Gen2",
      "Power Query (M)",
      "Lakehouse",
      "CSV",
    ],
    architecture: [
      { label: "customer_bronze.csv", icon: "file", layer: "bronze", detail: "Files/CS_10" },
      { label: "Lookup Merges", icon: "quality", detail: "State + suffix" },
      { label: "Parse Address", icon: "transform", detail: "Street, suffix, unit" },
      { label: "Phone + Quality Flag", icon: "validation", detail: "10 digits or null" },
      { label: "customer_silver", icon: "silver", layer: "silver", detail: "Lakehouse table" },
    ],
    concepts: [
      "Low-code transformation with Dataflow Gen2 (Power Query)",
      "Standardisation through reference lookups instead of hardcoded replacements",
      "Unknown values survive: a conditional column keeps the original suffix when the lookup has no match",
      "Rule-based data quality flag (1 or 0)",
      "Writing to an existing Lakehouse table with the Replace update method",
    ],
    dataQualityTechniques: [
      "State standardisation by lookup",
      "Suffix standardisation by lookup",
      "Phone reduced to ten digits or null",
      "Quality flag (1 or 0)",
      "Merge match counts",
    ],
    implementation: [
      "Placed customer_bronze.csv and the two lookup CSVs in the Lakehouse folder CS_10.",
      "Created a Dataflow Gen2 named TelCo, imported each CSV as its own query, set column types and promoted the first row to headers on both lookups.",
      "Merged the customer query with the state lookup (all 2,500 rows matched), expanded only Standard_State, removed the original State column and renamed Standard_State to State.",
      "Split Address on the right-most comma to separate the unit (for example Apt 4B) from the street.",
      "Split the street on the right-most space so the last word (the suffix) sits in its own column.",
      "Merged the suffix column with the suffix lookup (2,332 of 2,500 rows matched) and expanded Standard_Suffix.",
      "Added a conditional column: if the standard suffix is null, keep the original suffix; otherwise use the standard one.",
      "Merged the street body and the final suffix with a space into Address_Street, removed the helper columns and reordered the columns.",
      "Added a custom column that keeps only the digits of Phone and returns them if exactly ten remain, otherwise null; removed the original Phone and renamed the result to Phone_Clean.",
      "Added Data_quality_flag, which returns 1 only when customer ID, street, state and a ten-digit phone all pass, otherwise 0.",
      "Set the data destination to the existing table customer_silver in the Telco schema of the Lakehouse with the Replace update method and mapped the columns.",
      "Ran Save & run, checked the refresh history and opened the table in the Lakehouse.",
    ],
    screenshots: [
      {
        src: "/projects/Telco/1.png",
        alt: "Lakehouse folder CS_10 containing address_suffix_lookup.csv, customer_bronze.csv and state_lookup.csv",
        caption: "Source files: the customer CSV and two lookup CSVs sit in the Lakehouse folder CS_10",
      },
      {
        src: "/projects/Telco/2.png",
        alt: "Power Query showing the address suffix lookup after the Imported CSV step, with the header still in row 1",
        caption: "Import: the address suffix lookup is read as a CSV with a comma delimiter and two columns",
      },
      {
        src: "/projects/Telco/3.png",
        alt: "Power Query Changed column type step on the address suffix lookup, both columns set to text",
        caption: "Types: both lookup columns are set to text",
      },
      {
        src: "/projects/Telco/4.png",
        alt: "Address suffix lookup after promoting headers, showing Raw_Suffix and Standard_Suffix columns",
        caption: "Headers promoted: Raw_Suffix maps variants like Street, St. and Str. to the standard St",
      },
      {
        src: "/projects/Telco/5.png",
        alt: "Use first row as headers dialog on the state lookup, with variants such as CA, ca, Calif. and California",
        caption: "State lookup: first row promoted to headers; Raw_State holds variants such as ca, Calif. and California, all mapped to CA",
      },
      {
        src: "/projects/Telco/6.png",
        alt: "Merge dialog joining customer_silver to state_lookup csv, matching 2,500 of 2,500 rows",
        caption: "State merge: customer_silver is merged with the state lookup, and the preview matches all 2,500 rows",
      },
      {
        src: "/projects/Telco/7.png",
        alt: "Expand dialog with only Standard_State selected from the merged state lookup",
        caption: "Expand: only Standard_State is brought in from the lookup, and Raw_State is left out",
      },
      {
        src: "/projects/Telco/8.png",
        alt: "Customer table after removing the original State column, leaving CustomerID, Address, Phone and Standard_State",
        caption: "Clean-up: the original State column is removed, leaving the standardised value",
      },
      {
        src: "/projects/Telco/9.png",
        alt: "Customer table after renaming Standard_State to State, with a Phone column showing 98 percent valid and 2 percent empty",
        caption: "Rename: Standard_State becomes State; profiling shows Phone is 98% valid and 2% empty before cleaning",
      },
      {
        src: "/projects/Telco/10.png",
        alt: "Split column dialog set to a comma separator, right-most delimiter, split into columns",
        caption: "Unit split: the address is split on the right-most comma so a trailing unit such as Apt 4B gets its own column",
      },
      {
        src: "/projects/Telco/11.png",
        alt: "Split column dialog using a space separator at the right-most delimiter, splitting into columns",
        caption: "Suffix split: the street is split on the right-most space so the last word (the suffix) sits in its own column",
      },
      {
        src: "/projects/Telco/12.png",
        alt: "Merge dialog joining the suffix column to address_suffix_lookup csv, matching 2,332 of 2,500 rows",
        caption: "Suffix merge: the suffix column is merged with the suffix lookup, and the preview matches 2,332 of 2,500 rows",
      },
      {
        src: "/projects/Telco/13.png",
        alt: "Add conditional column dialog: if Standard_Suffix equals null then keep Address.4, else use Standard_Suffix",
        caption: "Unknown suffixes survive: when the lookup has no match, the original suffix is kept instead of dropped",
      },
      {
        src: "/projects/Telco/14.png",
        alt: "Merge columns dialog with a space separator and the new column name Address_Street",
        caption: "Rebuild street: the street body and the standardised suffix are merged with a space into Address_Street",
      },
      {
        src: "/projects/Telco/15.png",
        alt: "Custom column Clean_phone using Text.Select to keep digits and returning them only if the length is ten",
        caption: "Phone cleaning: only the digits are kept, and the value is returned only if exactly ten digits remain, otherwise null",
      },
      {
        src: "/projects/Telco/16.png",
        alt: "Custom column Data_quality_flag formula checking customer ID, street, phone and state are not null or blank",
        caption: "Quality flag: a custom column checks the customer ID, street, ten-digit phone and state (first half of the formula)",
      },
      {
        src: "/projects/Telco/17.png",
        alt: "End of the Data_quality_flag formula returning 1 when all checks pass, otherwise 0",
        caption: "Quality flag, continued: records that pass every check get 1, all others get 0",
      },
      {
        src: "/projects/Telco/18.png",
        alt: "Dataflow table with Address_Street, Address_unit, State, Phone_Clean and Data_quality_flag; rows with a null phone have a flag of 0",
        caption: "Result in the dataflow: clean street, unit, state and phone columns; records with a null phone carry a flag of 0",
      },
      {
        src: "/projects/Telco/19.png",
        alt: "Data destination dialog choosing the existing table customer_silver in the Telco schema",
        caption: "Destination: the output is written to the existing table customer_silver in the Telco schema of the Lakehouse",
      },
      {
        src: "/projects/Telco/20.png",
        alt: "Destination settings with the Replace update method and a column mapping from source to destination",
        caption: "Destination settings: Replace update method, with CustomerID mapped as a whole number and the other columns as text",
      },
      {
        src: "/projects/Telco/21.png",
        alt: "Save and run menu in the dataflow editor",
        caption: "Run: Save & run saves the dataflow and refreshes it",
      },
      {
        src: "/projects/Telco/22.png",
        alt: "Recent runs list showing on-demand refreshes with four succeeded and one failed",
        caption: "Run history: on-demand refreshes of 30 to 38 seconds succeeded, with one earlier run that failed after 9 seconds",
      },
      {
        src: "/projects/Telco/23.png",
        alt: "Lakehouse table view of customer_silver with six columns including Phone_Clean and Data_quality_flag",
        caption: "Output: customer_silver in the Lakehouse with six columns, ready for downstream use",
      },
    ],
    transformations: [
      {
        title: "Standardise state values with a lookup merge",
        description:
          "The customer State column held many spellings of the same state. After merging with the state lookup, only Standard_State is expanded, the original State column is dropped and Standard_State takes its name.",
        language: "m",
        code: `#"Removed columns" = Table.RemoveColumns(#"Expanded state_lookup csv", {"State"}),
#"Renamed columns" = Table.RenameColumns(#"Removed columns", {{"Standard_State", "State"}})`,
      },
      {
        title: "Keep unknown suffixes instead of dropping them",
        description:
          "After the suffix lookup merge, 2,332 of 2,500 rows found a standard suffix. For the rest, the conditional column keeps the original last word, so no address loses text.",
        language: "m",
        code: `if [Standard_Suffix] = null then [Address.4] else [Standard_Suffix]`,
      },
      {
        title: "Clean the phone number to ten digits or null",
        description:
          "All non-digit characters are removed. A result of exactly ten digits is kept; anything else (blanks, text such as bad_data, wrong lengths) becomes null.",
        language: "m",
        code: `let
    digits = Text.Select(Text.From([Phone]), {"0".."9"})
in
    if Text.Length(digits) = 10 then digits else null`,
      },
      {
        title: "Flag records that pass every quality check",
        description:
          "Data_quality_flag is 1 only when the customer ID, street, phone and state are all present and the phone is exactly ten digits; otherwise it is 0, so downstream users can filter on it.",
        language: "m",
        code: `if
    [CustomerID] <> null
    and [Address_Street] <> null
    and Text.Trim([Address_Street]) <> ""
    and [Phone_Clean] <> null
    and Text.Length([Phone_Clean]) = 10
    and Text.Select([Phone_Clean], {"0".."9"}) = [Phone_Clean]
    and [State] <> null
    and Text.Trim([State]) <> ""
then 1
else 0`,
      },
    ],
    dataQuality: {
      nullHandling:
        "A phone number that does not reduce to exactly ten digits becomes null. A null or blank customer ID, street, phone or state sets the quality flag to 0.",
      invalidRecords:
        "Placeholder text such as bad_data has no digits, so its Phone_Clean is null and its flag is 0. Records are flagged, not removed.",
      schemaValidation:
        "Destination column mapping sets CustomerID as a whole number and the other columns as text.",
      dataValidation:
        "The state merge matched 2,500 of 2,500 rows and the suffix merge matched 2,332 of 2,500. Profiling reports valid, error and empty percentages for each column.",
    },
    challenges: [
      {
        challenge:
          "Street suffixes were written many ways (Street, St., Str and so on), and some addresses had no suffix the lookup knew.",
        solution:
          "Split the last word into its own column, standardised it through the suffix lookup, and used a conditional column to keep the original word when there was no match, so nothing was dropped.",
      },
      {
        challenge:
          "Units such as Apt 4B were stored inside the address text after a comma.",
        solution:
          "Split the address on the right-most comma first, so the unit gets its own column and the street can then be split on the last space.",
      },
    ],
    learnings: [
      "Standardising messy categorical values with lookup tables instead of hardcoded replacements",
      "Splitting text on the right-most delimiter to separate a trailing detail",
      "Preserving unmatched values with a conditional column so no data is lost",
      "Building a quality flag that downstream consumers can filter on",
      "Choosing low-code (Dataflow Gen2) when the team needs a cleanse it can read and maintain",
    ],
    results: [
      "State merge matched all 2,500 customer rows to a standard state.",
      "Suffix merge matched 2,332 of 2,500 rows; the 168 unmatched rows equal the number of military and PSC addresses the brief says have no suffix, and their original suffix is kept.",
      "In the profiling sample (top 1,000 rows), Phone_Clean is 90% valid and 10% empty, and Address_unit is 22% filled.",
      "The customer_silver table was written to the Telco schema of the Lakehouse with six columns, and four on-demand refreshes completed successfully in 30 to 38 seconds.",
    ],
    // TODO: add the daily schedule, the SQL validation script and the unmatched-address report, then set status to "complete".
    // github: "https://github.com/your-username/your-repo",
  },
  
  {
    slug: "the-accountability-gap",
    title: "The Accountability Gap: Regulatory Attribution Chain in Microsoft Fabric",
    status: "in-progress",
    featured: true,
    summary:
      "A Microsoft Fabric case study in defensive T-SQL, hierarchy resolution, and SCD Type 2 history in a Fabric Warehouse for a $42B asset manager rebuilding its regulatory attribution chain across three jurisdictions.",
    businessProblem:
      "Three regulators (FCA, SEC, MAS) required Veritas Global to name the Relationship Manager responsible for every flagged position at the moment it was opened. Roster updates overwrote records in place, destroying historical accountability and exposing the firm to $2M–$5M per audit cycle.",
    objective:
      "Design and deliver a robust T-SQL architecture in a Microsoft Fabric Warehouse (Warehouse_Veritas) consisting of a governed clean view, a title-partitioned leaderboard, a 5-level hierarchy flattener without recursion, and an atomic SCD Type 2 MERGE to permanently close the accountability gap.",
    dataset: {
      source: "Legacy execution system exports (stg.Flagged_Positions.csv, Latin-1 encoded, dirty notionals and dates) and RM roster (ref.Relationship_Managers.csv), plus incoming roster changes (stg.New_RM_Roster).",
      structure: "stg.Flagged_Positions (PositionID, RMID, Asset_Class, Currency, Flag_Type, Status, Regulatory_Signoff, Settlement_Date, Flag_Date, Notional_Value) and ref.Relationship_Managers (RMID, Name, Title, ManagerID, Jurisdiction, Desk).",
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Warehouse",
      "T-SQL",
      "Delta Lake",
      "Data Pipeline",
    ],
    architecture: [
      { label: "Staging (CSV Export)", icon: "file" },
      { label: "Fabric Pipeline Ingestion", icon: "ingestion" },
      { label: "gold.Clean_Positions", icon: "quality", layer: "gold", detail: "Defensive T-SQL" },
      { label: "RM Leaderboard", icon: "transform", detail: "DENSE_RANK by Title" },
      { label: "Hierarchy Flattener", icon: "transform", detail: "5-level chain" },
      { label: "SCD Type 2 MERGE", icon: "curated", layer: "silver", detail: "History tracking" },
    ],
    concepts: [
      "Defensive casting with TRY_CONVERT and TRY_CAST to prevent batch failure on dirty source data",
      "Null-safe outer joins ensuring positions with missing RMs remain visible with explicit unassigned labels",
      "Exposure categorization mapping notional values into five risk bands (Low to Critical)",
      "Title-partitioned DENSE_RANK leaderboard for fair peer comparison of resolution performance",
      "Non-recursive 5-level self-referencing hierarchy flattening using left outer joins and CONCAT_WS",
      "Atomic SCD Type 2 MERGE handling title, manager, and jurisdiction changes while preserving history",
    ],
    dataQualityTechniques: [
      "TRY_CONVERT and TRY_CAST used across all numeric and date fields, returning sentinel values (1900-01-01 / NULL) instead of raising errors on malformed source strings.",
      "ISNULL handling for unassigned RMs so no position drops out of regulatory visibility.",
      "Deduplication of incoming roster state prior to hierarchy joins to prevent row multiplication.",
      "Transaction-wrapped SCD Type 2 updates closing prior records and inserting new active versions atomically.",
    ],
    implementation: [
      "Loaded legacy staging CSVs (Latin-1 encoded for £ symbols) and RM reference data into Warehouse_Veritas via Fabric data pipelines.",
      "Created gold.Clean_Positions view featuring defensive casting, exposure categorization, and null-safe RM left joins.",
      "Built RM leaderboard ranking resolutions with DENSE_RANK partitioned by Title for qualified sign-offs.",
      "Implemented non-recursive 5-level hierarchy flattener resolving reporting lines from Analyst to Managing Partner without gaps.",
      "Added SCD Type 2 history tracking columns (start_date, End_date, Active) and authored an atomic transaction MERGE processing incoming roster updates from stg.New_RM_Roster.",
    ],
    screenshots: [
      {
        src: "/projects/the-accountability-gap/1.png",
        alt: "Fabric Pipeline copy data activity source settings for VeritasGlobal staging files",
        caption: "Pipeline ingestion: copying legacy flagged positions and RM roster into Warehouse_Veritas staging",
      },
      {
        src: "/projects/the-accountability-gap/2.png",
        alt: "Copy data destination settings for ref_Relationship_Managers table",
        caption: "Reference load: landing relationship manager master data into the reference schema",
      },
      {
        src: "/projects/the-accountability-gap/5.png",
        alt: "T-SQL query creating gold.Clean_Positions view with TRY_CAST, TRY_CONVERT, and CASE exposure logic",
        caption: "Deliverable 1: governed gold.Clean_Positions view absorbing dirty source data safely",
      },
      {
        src: "/projects/the-accountability-gap/6.png",
        alt: "Hierarchy flattener T-SQL query using left joins and CONCAT_WS for 5-level reporting chain",
        caption: "Deliverable 3: non-recursive hierarchy flattener resolving the complete 5-level accountability chain",
      },
      {
        src: "/projects/the-accountability-gap/7.png",
        alt: "Hierarchy query execution results showing RMID, Name, Title, Hierarchy depth and chain string",
        caption: "Hierarchy execution: successful resolution of reporting lines from Analyst up to Managing Partner",
      },
      {
        src: "/projects/the-accountability-gap/8.png",
        alt: "Table creation script for stg.New_RM_Roster and ALTER TABLE adding SCD Type 2 columns",
        caption: "Deliverable 4 setup: creating incoming roster staging and adding history tracking columns to reference table",
      },
      {
        src: "/projects/the-accountability-gap/9.png",
        alt: "SCD Type 2 transaction script updating active records and closing prior states",
        caption: "Deliverable 4 transaction: atomic update closing expired roster states prior to new version insertion",
      },
      {
        src: "/projects/the-accountability-gap/10.png",
        alt: "SCD Type 2 MERGE script committing transaction and inserting new active RM records",
        caption: "Deliverable 4 commit: inserting new active records without overwriting historical states",
      },
      {
        src: "/projects/the-accountability-gap/11.png",
        alt: "Leaderboard query using DENSE_RANK partitioned by Title for resolution performance",
        caption: "Deliverable 2: RM leaderboard ranking resolution performance partitioned by professional title",
      },
    ],
    results: [
      "Permanently closed the regulatory accountability gap with fully auditable point-in-time attribution from go-live onward.",
      "Eliminated pipeline crashes caused by dirty source data through robust defensive casting and sentinel handling.",
      "Automated multi-level hierarchy resolution and SCD Type 2 history tracking in Fabric Warehouse.",
    ],
  },
    {
    slug: "global-corp-spark-query-plans",
    title: "Global Corp: Reading Spark Query Plans for an Accounts Receivable Report",
    status: "in-progress",
    featured: true,
    summary:
      "A Microsoft Fabric notebook study of what Spark does beneath a line of PySpark. Using an accounts receivable transactions CSV and a customer master Delta table, it reads Catalyst physical plans from the bottom up, compares broadcast and sort-merge joins, checks filter pushdown and partition pruning, and captures the plan of the morning report before tuning it. Based on bootcamp case study 05.",
    businessProblem:
      "In the bootcamp scenario, a finance division runs a daily accounts receivable report that joins about 10 million transactions to a 5,000-row customer master and sums the amounts per customer. The report works, but before quarter-end volume doubles an engineer wants to know how Spark reads the CSV, whether it moves ten million rows across the network, and what could make it read and shuffle less.",
    objective:
      "Learn to read Spark physical plans with explain(), compare how Spark joins a large and a small table, test pushdown and partition pruning, and capture the plan of the morning report as the starting point for tuning.",
    dataset: {
      source:
        "AR_Transactions.csv in the Lakehouse folder Files/CS_5, and the Delta table GlobalCorp.customer_master in the LH_Umeshsahu Lakehouse (about 10 million and 5,000 rows according to the case study brief).",
      structure:
        "Transactions: TransactionID, CustomerID, Transaction_Date, TransactionAmount. Customer master: CustomerID (integer), CustomerName, Address, Credit_Limit (double).",
      fields: [
        "TransactionID",
        "CustomerID",
        "Transaction_Date",
        "TransactionAmount",
        "CustomerName",
        "Credit_Limit",
      ],
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Notebook",
      "PySpark",
      "Apache Spark",
      "Delta Lake",
      "Lakehouse",
      "CSV",
      "Parquet",
    ],
    architecture: [
      { label: "CSV + Delta Sources", icon: "source", detail: "AR_Transactions, customer_master" },
      { label: "PySpark Notebook", icon: "transform", detail: "Read and transform" },
      { label: "Catalyst Plan", icon: "validation", detail: "explain(formatted)" },
      { label: "Join Strategy", icon: "spark", detail: "Broadcast vs sort-merge" },
      { label: "Partitioned Delta", icon: "storage", detail: "Txntest by txn_year" },
      { label: "Customer Totals", icon: "analytics", detail: "Morning report plan" },
    ],
    concepts: [
      "Reading physical plans bottom-up with explain(mode='formatted')",
      "Predicate pushdown and column pruning on scans",
      "Partition pruning on a Delta table partitioned by year",
      "Broadcast hash join versus sort-merge join",
      "Shuffles shown as Exchange nodes",
      "Adaptive Query Execution (the plan shows isFinalPlan=false before the query runs)",
    ],
    dataQualityTechniques: [
      "printSchema on both sources to confirm column types",
      "Spotting a type mismatch from the plan: CSV columns arrive as strings, so the join key is cast to int",
      "Inspecting every plan with explain before running the query",
    ],
    implementation: [
      "Placed AR_Transactions.csv and Customer_Master.csv in the Lakehouse folder Files/CS_5, with the customer master also available as the Delta table GlobalCorp.customer_master.",
      "In a PySpark notebook, imported pyspark.sql.functions, read the customer master with spark.read.table and the transactions with spark.read.csv (header=True), and printed both schemas.",
      "Filtered the customer master to one customer and printed its formatted plan twice, once selecting one column and once selecting two, to see how pushdown and pruning appear in the scan.",
      "Filtered the CSV on a cast column and printed the plan to see which filters reach the scan.",
      "Wrote the transactions as a Delta table Txntest partitioned by txn_year, read it back with a filter on 2022 and checked the plan for partition filters.",
      "Joined transactions to the customer master with default settings and read the join strategy in the plan.",
      "Set spark.sql.autoBroadcastJoinThreshold to -1 and printed the plan again to compare it with the default join.",
      "Printed the plan of the morning report (a merge-hinted left join, a date filter and a groupBy sum) as the starting point for tuning.",
    ],
    screenshots: [
      {
        src: "/projects/GlobalCorp/1.png",
        alt: "Fabric notebook with the Lakehouse explorer showing the CS_5 folder holding AR_Transactions.csv and Customer_Master.csv, and cells reading the customer master and the transactions",
        caption: "Setup: the notebook imports PySpark functions, reads the customer master table and reads AR_Transactions.csv from Files/CS_5",
      },
      {
        src: "/projects/GlobalCorp/2.png",
        alt: "Notebook cell reading both sources and printing the customer master schema with CustomerID, CustomerName, Address and Credit_Limit",
        caption: "Schema: customer_master has four typed columns (CustomerID integer, CustomerName and Address strings, Credit_Limit double)",
      },
      {
        src: "/projects/GlobalCorp/3.png",
        alt: "Cell filtering the customer master to CustomerID 10001 and selecting CustomerName, with its physical plan showing Project, Filter, ColumnarToRow and Scan parquet",
        caption: "Plan 1: filtering the customer master to one customer, with the physical plan printed by explain(mode='formatted')",
      },
      {
        src: "/projects/GlobalCorp/4.png",
        alt: "Physical plan for the one-customer query read from the bottom: Scan parquet, ColumnarToRow, Filter and Project",
        caption: "Plan 1 read bottom-up: Scan parquet comes first, then ColumnarToRow, Filter and Project",
      },
      {
        src: "/projects/GlobalCorp/5.png",
        alt: "Scan node listing PushedFilters IsNotNull and EqualTo CustomerID 10001 and a ReadSchema of CustomerID and CustomerName, followed by the Filter and Project nodes",
        caption: "Plan 1, scan and nodes: the equality filter appears in PushedFilters, only CustomerID and CustomerName are read, and Project keeps only CustomerName",
      },
      {
        src: "/projects/GlobalCorp/6.png",
        alt: "Cell selecting CustomerID and CustomerName after filtering, with a physical plan that has Filter, ColumnarToRow and Scan parquet but no Project node",
        caption: "Plan 2: selecting both columns leaves no separate Project node, and the filter is still pushed to the scan",
      },
      {
        src: "/projects/GlobalCorp/7.png",
        alt: "Cell filtering the CSV on TransactionAmount cast to int equal to 70000, with a plan showing a Filter over Scan csv and PushedFilters listing only IsNotNull",
        caption: "Plan 3: filtering a CSV column after a cast; only IsNotNull is pushed to the scan and the comparison stays in a Filter node. The CSV columns are all strings",
      },
      {
        src: "/projects/GlobalCorp/8.png",
        alt: "Cell writing the transactions as a Delta table partitioned by txn_year, and a cell reading it back with a filter on txn_year equal to 2022",
        caption: "Partitioning: the transactions are written as the Delta table Txntest partitioned by txn_year, then read back with a filter on 2022",
      },
      {
        src: "/projects/GlobalCorp/9.png",
        alt: "Plan for the partitioned table showing PartitionFilters txn_year equals 2022 and no separate Filter node",
        caption: "Partition pruning: the scan lists PartitionFilters txn_year = 2022, and the plan has no separate Filter node",
      },
      {
        src: "/projects/GlobalCorp/10.png",
        alt: "Cell joining transactions to the customer master with a left join and printing a plan with BroadcastHashJoin and BroadcastExchange",
        caption: "Join 1 (default): joining without a hint gives a BroadcastHashJoin, with the customer side in a BroadcastExchange",
      },
      {
        src: "/projects/GlobalCorp/11.png",
        alt: "Plan nodes for the default join: Filter, BroadcastExchange, BroadcastHashJoin on a cast CustomerID, Project and AdaptiveSparkPlan with isFinalPlan false",
        caption: "Join 1, node details: the customer side is broadcast, the CSV's CustomerID is cast to int for the join, and the plan is not yet final (isFinalPlan=false)",
      },
      {
        src: "/projects/GlobalCorp/12.png",
        alt: "Cell setting spark.sql.autoBroadcastJoinThreshold to -1 and printing a join plan with Exchange and Sort nodes",
        caption: "Join 2 (broadcast off): setting spark.sql.autoBroadcastJoinThreshold to -1 changes the plan, and the transactions side now goes through an Exchange and a Sort",
      },
      {
        src: "/projects/GlobalCorp/13.png",
        alt: "Plan nodes showing Filter, Exchange hashpartitioning on CustomerID with 200 partitions, Sort and a SortMergeJoin",
        caption: "Join 2, node details: both sides are hash-partitioned on CustomerID (200 partitions) and sorted before a SortMergeJoin",
      },
      {
        src: "/projects/GlobalCorp/14.png",
        alt: "Morning report cell and its plan tree: HashAggregate, Exchange, HashAggregate, Project, SortMergeJoin with Sort and Exchange on each side",
        caption: "Morning report plan: a sort-merge join, then a partial HashAggregate, an Exchange and a final HashAggregate",
      },
      {
        src: "/projects/GlobalCorp/15.png",
        alt: "Report plan scan of the CSV with PushedFilters including GreaterThanOrEqual Transaction_Date 2025-01-01, followed by Filter, Project and Exchange nodes",
        caption: "Report plan, transactions scan: the date filter is listed in the scan's PushedFilters even though it was written after the join, and only three columns are read",
      },
      {
        src: "/projects/GlobalCorp/16.png",
        alt: "Report plan nodes: Sort, Scan parquet of customer_master reading CustomerID and CustomerName, Filter and Exchange",
        caption: "Report plan, customer side: the customer master scan reads only CustomerID and CustomerName, then is filtered and exchanged by CustomerID",
      },
      {
        src: "/projects/GlobalCorp/17.png",
        alt: "Report plan nodes: Filter, Exchange, Sort, SortMergeJoin LeftOuter on a cast CustomerID, and Project of TransactionAmount and CustomerName",
        caption: "Report plan, join: the SortMergeJoin casts the CSV's CustomerID to int, and the Project keeps only TransactionAmount and CustomerName",
      },
      {
        src: "/projects/GlobalCorp/18.png",
        alt: "Report plan aggregation nodes: partial_sum HashAggregate, Exchange hashpartitioning on CustomerName with 200 partitions, final sum HashAggregate and AdaptiveSparkPlan with isFinalPlan false",
        caption: "Report plan, aggregation: a partial sum per partition, an Exchange by CustomerName, then the final sum; the plan is not yet final (isFinalPlan=false)",
      },
    ],
    transformations: [
      {
        title: "Write the transactions as a Delta table partitioned by year",
        description:
          "Adds a txn_year column from the transaction date and writes one folder per year, so a query that filters on txn_year can skip the other folders.",
        language: "python",
        code: `txn_df.withColumn("txn_year", F.year("Transaction_date")) \\
    .write.mode("overwrite").format("delta") \\
    .partitionBy("txn_year") \\
    .saveAsTable("LH_Umeshsahu.GlobalCorp.Txntest")`,
      },
      {
        title: "Turn off automatic broadcast to compare join strategies",
        description:
          "Setting the broadcast threshold to -1 stops Spark from broadcasting the small table, so the same join is planned as a sort-merge join with a shuffle on both sides.",
        language: "python",
        code: `spark.conf.set("spark.sql.autoBroadcastJoinThreshold", -1)
joined_df = txn_df.join(cust_df, "Customerid", "left")
joined_df.explain(mode="formatted")`,
      },
      {
        title: "The morning report (before tuning)",
        description:
          "The report as it runs today: a merge-hinted left join, a date filter and a sum per customer. Its plan has three Exchange nodes: one for each side of the join and one for the group by.",
        language: "python",
        code: `report_df = (txn_df.join(cust_df.hint("merge"), "CustomerID", "left")
    .filter(F.col("Transaction_Date") >= "2025-01-01")
    .groupBy("CustomerName")
    .agg(F.sum("TransactionAmount").alias("total_amount")))

report_df.explain(mode="formatted")`,
      },
    ],
    dataQuality: {
      schemaValidation:
        "printSchema on customer_master shows four typed columns. The CSV is read with header=True and no schema inference, so every transaction column arrives as a string and Spark casts CustomerID to int when joining.",
    },
    learnings: [
      "Reading a physical plan from the bottom up and spotting scans, filters, exchanges and joins",
      "Checking PushedFilters, ReadSchema and PartitionFilters to see what a scan actually does",
      "Seeing how the join strategy changes the number of shuffles (Exchange nodes)",
      "Noticing type mismatches in a plan, such as a string join key being cast to int",
      "Understanding that the plan printed before a run (isFinalPlan=false) can be re-planned by Adaptive Query Execution",
    ],
    results: [
      "Filtering the customer master to one customer shows the equality filter in PushedFilters, and only CustomerID and CustomerName are read.",
      "Filtering the partitioned Delta table on txn_year = 2022 shows as a PartitionFilter, with no separate Filter node.",
      "The default join is a BroadcastHashJoin; with autoBroadcastJoinThreshold set to -1 it becomes a SortMergeJoin with an Exchange and a Sort on each side.",
      "The morning report's plan has three Exchange nodes (one for each side of the join and one for the group by), and its date filter is pushed to the CSV scan.",
    ],
    // TODO: add the operation classification (narrow or wide), the tuned "after" plan (broadcast join, Delta source), run timings and the answer to why the date filter appears on the scan, then set status to "complete".
    // github: "https://github.com/your-username/your-repo",
  },
    {
    slug: "velocitytrade-live-market-intelligence",
    title: "VelocityTrade Capital: Live Market Intelligence with Real-Time Intelligence",
    status: "in-progress",
    featured: true,
    summary:
      "A Microsoft Fabric Real-Time Intelligence pipeline that replaces batch market data with streaming ticks. An Eventstream carries stock tick events through a field-mapping operator into a KQL Database table in an Eventhouse, and a KQL Queryset holds the analytical queries: latest close, intra-day range, daily return, volume surge, drawdown from peak and a data quality check. Based on bootcamp case study 11.",
    businessProblem:
      "In the bootcamp scenario, an algorithmic trading firm monitoring 240 symbols fed its strategies from a batch pipeline refreshed every 15 to 45 minutes. Signals ran on stale prices, no event-level audit trail existed, and price moves were noticed only by watching dashboards. The brief estimates 2.1 to 3.4 million dollars per quarter of return leakage from timing errors.",
    objective:
      "Ingest live tick data through an Eventstream into a KQL Database, and expose it through a governed library of KQL queries that can drive dashboards and alerts.",
    dataset: {
      source:
        "Stocksdata, a sample stock market data source connected to an Eventstream, landing in the StockTicks table of a KQL Database.",
      structure:
        "One row per tick event with eight fields: Date, Open, High, Low, Close, AdjClose, Volume and Ticker.",
      fields: ["Date", "Open", "High", "Low", "Close", "AdjClose", "Volume", "Ticker"],
    },
    technologies: [
      "Microsoft Fabric",
      "Real-Time Intelligence",
      "Eventstream",
      "Eventhouse",
      "KQL Database",
      "KQL",
      "KQL Queryset",
    ],
    architecture: [
      { label: "Stocksdata", icon: "source", detail: "Sample tick source" },
      { label: "Eventstream", icon: "ingestion", detail: "EventStreamrun" },
      { label: "ManageFields", icon: "transform", detail: "Process before ingestion" },
      { label: "StockTicks", icon: "storage", detail: "KQL Database (Eventhouse)" },
      { label: "KQL Queryset", icon: "analytics", detail: "Analytical queries" },
    ],
    concepts: [
      "Event-driven ingestion with an Eventstream instead of batch refresh",
      "Event processing before ingestion with a ManageFields operator",
      "Eventhouse and KQL Database as a time-series store",
      "KQL aggregation with summarize, arg_max and extend",
      "A query library with a data quality query",
    ],
    dataQualityTechniques: [
      "Anomaly query for zero or negative High and Low prices, negative volume and High below Low",
      "Typed StockTicks schema (datetime, real and long fields)",
      "Field mapping applied in the stream before events are ingested",
    ],
    implementation: [
      "Created the Eventhouse EH_UmeshSahu with a KQL Database and the StockTicks table holding Date, Open, High, Low, Close, AdjClose, Volume and Ticker.",
      "Built the Eventstream EventStreamrun with the Stocksdata sample source feeding its default stream.",
      "Added a ManageFields operator to process events before ingestion.",
      "Set the destination to the StockTicks table in the EH_UmeshSahu KQL Database, with JSON as the input data format.",
      "Checked the StockTicks table: the Data Activity Tracker reported 8.6M ingested rows, with ingestion activity from 4 to 7 November.",
      "Created the KQL Queryset EH_UmeshSahu_queryset and wrote the analytical queries against StockTicks, each in its own tab.",
    ],
    screenshots: [
      {
        src: "/projects/Velocity/1.png",
        alt: "Eventstream canvas with the Stocksdata source, an Eventstream stream, a ManageFields operator and a StockTicks destination",
        caption: "Pipeline: the Stocksdata source flows through the stream and a ManageFields operator into the StockTicks destination",
      },
      {
        src: "/projects/Velocity/2.png",
        alt: "Eventhouse destination settings with StockTicks as the destination name, the EH_UmeshSahu KQL Database and table, and JSON input format",
        caption: "Destination: events are written to the StockTicks table of the EH_UmeshSahu KQL Database as JSON, after event processing",
      },
      {
        src: "/projects/Velocity/3.png",
        alt: "KQL query returning the latest Close per Ticker using summarize and arg_max",
        caption: "Query 1: the latest closing price per ticker, using arg_max on the event time",
      },
      {
        src: "/projects/Velocity/4.png",
        alt: "KQL queries calculating the average of High minus Low per Ticker, written two ways",
        caption: "Query 2: average intra-day range (High minus Low) per ticker, written directly and through a derived column",
      },
      {
        src: "/projects/Velocity/5.png",
        alt: "KQL query averaging Close minus Open per Ticker",
        caption: "Query 3: average daily return, measured as Close minus Open, per ticker",
      },
      {
        src: "/projects/Velocity/6.png",
        alt: "KQL query computing a volume surge ratio of maximum volume to average volume per Ticker and filtering ratios above 1.97",
        caption: "Query 4: volume surge detection, flagging tickers whose maximum volume exceeds average volume by more than a set ratio",
      },
      {
        src: "/projects/Velocity/7.png",
        alt: "KQL query computing each ticker's peak High, latest Close and a Drawdown percentage",
        caption: "Query 5: drawdown, the gap between each ticker's peak High and its latest Close",
      },
      {
        src: "/projects/Velocity/8.png",
        alt: "KQL query filtering rows where High or Low is zero or negative, Volume is negative, or High is below Low",
        caption: "Query 6: data quality check for zero or negative prices, negative volume and High below Low",
      },
      {
        src: "/projects/Velocity/9.png",
        alt: "StockTicks table overview with a Data Activity Tracker chart showing 8.6M ingested rows and the eight-column schema",
        caption: "Ingestion check: the StockTicks table has eight columns, and its Data Activity Tracker shows 8.6M ingested rows",
      },
    ],
    transformations: [
      {
        title: "Latest close per ticker",
        description:
          "Groups ticks by ticker and returns the Close from the row with the most recent Date, the current price reference for each symbol.",
        language: "kql",
        code: `StockTicks
| summarize arg_max(todatetime(Date), Close) by Ticker`,
      },
      {
        title: "Volume surge detection",
        description:
          "Compares each ticker's maximum volume with its average volume and keeps only tickers where the ratio is above a set threshold, flagging abnormal activity.",
        language: "kql",
        code: `StockTicks
| summarize AvgVolume = avg(Volume),
            MaxVolume = max(Volume) by Ticker
| extend SurgeRatio = round(MaxVolume / AvgVolume, 2)
| where SurgeRatio > 1.97`,
      },
      {
        title: "Drawdown from peak",
        description:
          "Finds each ticker's peak High and latest Close, then calculates the percentage gap between them to surface instruments in possible reversal.",
        language: "kql",
        code: `StockTicks
| summarize PeakHigh = max(High),
            Latestclose = arg_max(todatetime(Date), Close) by Ticker
| extend Drawdown = (PeakHigh - Close) / Close * 100`,
      },
      {
        title: "Data quality violations",
        description:
          "Returns rows with impossible values: zero or negative High or Low, negative volume, or a High below the Low, so bad data can be caught before it reaches a signal.",
        language: "kql",
        code: `StockTicks
| where High <= 0 or Low <= 0 or Volume < 0 or High < Low`,
      },
    ],
    dataQuality: {
      schemaValidation:
        "StockTicks has eight typed columns (Date, Open, High, Low, Close, AdjClose, Volume, Ticker) and the Eventstream destination reads events as JSON.",
      invalidRecords:
        "A KQL query lists rows with zero or negative High or Low prices, negative volume or High below Low.",
      dataValidation:
        "The StockTicks Data Activity Tracker shows ingestion activity, with 8.6M rows ingested.",
    },
    learnings: [
      "Building a streaming ingestion path with an Eventstream into a KQL Database",
      "Applying event processing before data lands in the table",
      "Writing KQL for latest values, ranges, ratios and anomaly checks",
      "Keeping a data quality query in the same library as the analytical queries",
    ],
    results: [
      "StockTicks holds an eight-column tick schema, and its Data Activity Tracker reported 8.6M ingested rows with activity from 4 to 7 November.",
      "Six KQL queries are written in the queryset (latest close, intra-day range, daily return, volume surge, drawdown and a data quality check).",
    ],
    // TODO: add the remaining queries (pipeline freshness and derived field integrity), run results, the Real-Time Dashboard, the Activator alert and the audit log, then set status to "complete".
    // TODO: check the drawdown formula; the brief defines it as the decline from the peak High, which would divide by PeakHigh, not Close.
    // github: "https://github.com/your-username/your-repo",
  },
  {
    slug: "RetailCore-postgresql-gateway-ingestion",
    title: "RetailCore Ltd: On-Demand PostgreSQL Ingestion through an On-Premises Gateway",
    status: "in-progress",
    featured: true,
    summary:
      "A Fabric pipeline that replaces a daily manual CSV export. An on-premises data gateway reaches a PostgreSQL inventory table, a Copy activity does a full extract and overwrite into a Lakehouse Delta table, and a second activity writes one audit row per run.",
    businessProblem:
      "An analyst exported the inventory table to CSV every day and dropped it in a shared folder. When the analyst was absent nothing moved, large files were truncated, special characters were garbled and columns were silently dropped. Nothing recorded when the data was last refreshed or how many rows moved, so merchandising could not tell whether it was looking at today's or yesterday's stock.",
    objective:
      "RetailCore Ltd runs twelve regional warehouses with about 80,000 active SKUs. Build a production transfer mechanism that moves the PostgreSQL inventory table into the Lakehouse as a governed Delta table, triggered by the warehouse supervisor once the day's entries are confirmed, with a timestamped audit record for every run and no file handling at any stage.",
    dataset: {
      source: "On-premises PostgreSQL 18 table inventory.\"InventorySnapshot\" (about 670,000 rows: 80,000 SKUs, each held in about 70 percent of 12 warehouses), reached through an on-premises data gateway installed on the source server.",
      structure: "Six columns: sku_id, product_name, warehouse_code (WH01 to WH12), stock_on_hand, last_updated (timestamp with time zone) and unit_cost (decimal(10,2)). The primary key is (sku_id, warehouse_code). Seeded with edge cases: zero stock, a 99,999.99 unit cost, accented product names and a 255-character name.",
    },
    technologies: [
      "Microsoft Fabric",
      "Fabric Data Pipeline",
      "On-premises Data Gateway",
      "PostgreSQL",
      "Lakehouse",
      "Delta Lake",
      "SQL",
    ],
    architecture: [
      { label: "PostgreSQL (On-prem)", icon: "source" },
      { label: "Data Gateway", icon: "ingestion", detail: "Outbound only" },
      { label: "Copy Activity", icon: "ingestion", detail: "Full extract" },
      { label: "InventorySnapshot", icon: "storage", layer: "silver", detail: "Delta, Overwrite" },
      { label: "Audit Copy Activity", icon: "transform", detail: "On success" },
      { label: "pipeline_audit_log", icon: "quality", detail: "One row per run" },
    ],
    concepts: [
      "On-premises data gateway: reaches the database through outbound connections only, without exposing the server to the internet",
      "Reusable gateway connection that other pipelines can share",
      "Full extract with full overwrite: records are corrected several times a day, so insert timestamps are unreliable and the Lakehouse must match PostgreSQL at the moment of the trigger",
      "Push model: the warehouse supervisor triggers the run, so readiness and transfer happen in one auditable step",
      "Idempotent load: the Overwrite table action means repeat runs add no duplicate rows",
      "Dynamic content: pipeline().RunId and activity('Copy data1').output.rowsCopied feed the audit query",
      "Quoted mixed-case PostgreSQL identifiers (inventory.\"InventorySnapshot\")",
    ],
    dataQualityTechniques: [
      "Primary key on (sku_id, warehouse_code) in the source, with a duplicate-pair query to confirm the Delta table holds each pair once",
      "NOT NULL checks on the source columns, re-checked by query in the Lakehouse because Delta does not enforce keys or NOT NULL",
      "unit_cost kept at decimal(10,2) with no rounding, and last_updated kept as a timestamp with time zone",
      "Edge-case rows (zero stock, high unit cost, special characters, maximum-length name) used to test the pipeline against the CSV failure modes",
      "Audit row per run with run ID, timestamp, source table, rows transferred and status, so freshness and volume are always visible",
      "Row-count reconciliation between PostgreSQL and the Delta table, plus a second run with no source changes to prove the count is unchanged",
    ],
    implementation: [
      "Created the inventory schema and the InventorySnapshot table in PostgreSQL with a composite primary key, then seeded about 670,000 rows across 12 warehouses, plus a 5 percent intra-day correction update and edge-case rows.",
      "Installed the on-premises data gateway (Umesh-onprem-gateway) on the PostgreSQL machine and confirmed it online and ready for Microsoft Fabric.",
      "Created a PostgreSQL connection in Fabric and used it as the source of the Copy activity, reading inventory.InventorySnapshot.",
      "Set the Copy destination to the Lakehouse LH_Umeshsahu, schema CaseOnprem, with the Overwrite table action so every run replaces the whole table.",
      "Added a second Copy activity (Copy data2) chained on success of the first. Its source query is built with @concat from pipeline().RunId, CURRENT_TIMESTAMP, the source table name, string(activity('Copy data1').output.rowsCopied) and a SUCCESS status.",
      "Pointed the audit activity at pipeline_audit_log (run ID, run timestamp, source table, rows transferred, execution status).",
      // TODO: add after the build is complete
      // "Added a FAILURE path from the On fail connector of Copy data1 so a failed copy is also logged.",
      // "Ran the pipeline, compared row counts, re-ran it and confirmed the count was unchanged.",
    ],
    screenshots: [
      {
        src: "/projects/RetailCore/1.png",
        alt: "pgAdmin showing the SQL that creates the inventory schema and the InventorySnapshot table with a composite primary key",
        caption: "Source table: inventory.\"InventorySnapshot\" in PostgreSQL 18 with six columns and a primary key on (sku_id, warehouse_code)",
      },
      {
        src: "/projects/RetailCore/2.png",
        alt: "On-premises data gateway status window showing Umesh-onprem-gateway online and ready, with Microsoft Fabric marked Ready",
        caption: "Gateway: Umesh-onprem-gateway is online and ready for Microsoft Fabric, installed on the PostgreSQL machine",
      },
      {
        src: "/projects/RetailCore/3.png",
        alt: "Copy data1 source settings using a PostgreSQL connection to read inventory.InventorySnapshot",
        caption: "Copy activity source: reads inventory.InventorySnapshot through the PostgreSQL connection in Table mode",
      },
      {
        src: "/projects/RetailCore/4.png",
        alt: "Copy data1 destination settings loading a Lakehouse table in the CaseOnprem schema with the Overwrite table action",
        caption: "Copy activity destination: Lakehouse Delta table in the CaseOnprem schema with Overwrite, so each run replaces the whole table",
      },
      {
        src: "/projects/RetailCore/5.png",
        alt: "Pipeline expression builder showing a concat expression that builds the audit SELECT with pipeline RunId and rowsCopied",
        caption: "Audit query: dynamic content builds one row from pipeline().RunId, CURRENT_TIMESTAMP, the source table name and the rowsCopied output of Copy data1",
      },
      {
        src: "/projects/RetailCore/6.png",
        alt: "Copy data2 destination settings pointing at the pipeline_audit_log table",
        caption: "Audit activity destination: Copy data2 writes the audit row to pipeline_audit_log after the main copy succeeds",
      },
    ],
    results: [
      // TODO: fill in after the verification run
      // "Row count: Lakehouse = PostgreSQL = ___",
      // "Re-run: row count unchanged, one new audit row per run",
      "Gateway online, source table built, and the two-activity pipeline (full-overwrite Copy, then audit Copy) wired end to end.",
    ],
    // github: "your-username/your-repo",
  },
  
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
