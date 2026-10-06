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
        src: "/projects/Incremental-Shipping/1.png",
        alt: "Spark SQL notebook creating and querying the GFF watermarktable",
        caption: "State table: GFF.watermarktable (TableName, Watermarkvalue) created in a Spark SQL notebook and queried to confirm its single row",
      },
      {
        src: "/projects/Incremental-Shipping/2.png",
        alt: "Lookup activity Get_mod_time reading GFF.watermarktable with First row only enabled",
        caption: "Lookup activity: Get_mod_time reads the last watermark from GFF.watermarktable (first row only)",
      },
      {
        src: "/projects/Incremental-Shipping/3.png",
        alt: "Copy data source settings reading JSON from CS_2 with a filter by last modified window",
        caption: "Copy activity source: reads JSON from CS_2 recursively, filtered by last modified from the Lookup watermark to @pipeline().TriggerTime",
      },
      {
        src: "/projects/Incremental-Shipping/4.png",
        alt: "Copy data destination settings loading GFF.ShippingLogs with the Append table action",
        caption: "Copy activity destination: loads GFF.ShippingLogs using Append, since each shipment event is a new immutable record",
      },
      {
        src: "/projects/Incremental-Shipping/5.png",
        alt: "Notebook activity settings passing PipelineRunTimeStamp as @pipeline().TriggerTime",
        caption: "Notebook activity: UpdateWatermark receives PipelineRunTimeStamp = @pipeline().TriggerTime and runs only after the Copy succeeds",
      },
      {
        src: "/projects/Incremental-Shipping/6.png",
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
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
