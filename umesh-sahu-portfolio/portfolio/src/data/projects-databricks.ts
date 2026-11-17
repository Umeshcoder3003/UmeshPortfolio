import type { Project } from "@/types";

/**
 * Databricks case studies. Imported and added to the main list in projects.ts.
 * To add another Databricks project, add one more object to this array.
 */
const BASE = "/projects/greengrid-smart-pricing-databricks";

export const databricksProjects: Project[] = [
  {
    slug: "greengrid-smart-pricing-databricks",
    platform: "databricks",
    title: "GreenGrid Solutions: Smart Pricing Pilot Billing Pipeline on Databricks",
    status: "complete",
    featured: true,
    summary:
      "A Bronze-to-Silver pipeline on Databricks that replaces spreadsheet billing for a smart-energy pilot. A PySpark notebook quarantines out-of-range meter readings, hashes customer emails with SHA-256, applies a peak-hour rate and writes a billing table, with a dashboard on top. Based on a Databricks bootcamp case study.",
    businessProblem:
      "In the bootcamp scenario, GreenGrid billed 100 pilot homes from spreadsheets and investors flagged billing integrity and privacy as high risk. Meter telemetry carried negative readings and phantom spikes of up to 9,000 kWh (62 of them in December), Excel applied the peak multiplier inconsistently, and customer emails sat in plain text on a shared drive. The pilot had to move to an automated, auditable pipeline before scaling toward 50,000 nodes.",
    objective:
      "Remove bad readings before billing sees them, hash the email before anything is written, and bill each reading at a peak-aware rate that can be changed without editing code.",
    dataset: {
      source:
        "Three uploaded files: meter_readings.json, customer_pii.csv and pricing_plans.csv, saved as Bronze tables in databricksprojects.greengrid.",
      structure:
        "bronze_readings (meter readings), bronze_pii (customer email per meter) and bronze_plans (two pricing plans, Saver and Eco-Green).",
      fields: [
        "kwh",
        "meter_id",
        "status",
        "timestamp",
        "MeterID",
        "PlanID",
        "CustomerEmail",
        "PlanName",
        "BasePricePerKwh",
      ],
    },
    technologies: [
      "Databricks",
      "PySpark",
      "Delta Lake",
      "Unity Catalog",
      "Databricks Notebooks",
      "Databricks Dashboards",
      "Serverless Compute",
    ],
    architecture: [
      { label: "Uploaded Files", detail: "JSON + CSV", icon: "file" },
      { label: "Bronze Tables", detail: "readings, pii, plans", icon: "bronze", layer: "bronze" },
      { label: "Quality Filter", detail: "kWh range check", icon: "validation" },
      { label: "Hash Email", detail: "SHA-256", icon: "quality" },
      { label: "Peak-aware Billing", detail: "FinalRate x kWh", icon: "transform" },
      { label: "Silver_SmartBill", detail: "+ quarantine_readings", icon: "silver", layer: "silver" },
      { label: "Dashboard", detail: "Smart Bill Insights", icon: "analytics" },
    ],
    concepts: [
      "Medallion architecture: Bronze tables stay raw, cleaning and billing happen in Silver",
      "Quarantine before billing: bad readings never reach the bill",
      "PII protection: email replaced by a SHA-256 hash and the raw column dropped before writing",
      "Left joins from readings so a missing meter or plan lookup does not remove a reading",
      "Notebook widgets for the peak multiplier and peak window, so the rate changes without editing code",
      "Overwrite writes, so a rerun rebuilds the same two tables",
      "Unity Catalog lineage from Bronze tables to Silver and quarantine tables",
    ],
    dataQualityTechniques: [
      "Only readings above 0 and below 100 kWh continue to billing",
      "Negative and overload readings go to quarantine_readings with a Rejection_Reason",
      "Customer email hashed with SHA-256; raw email and MeterID dropped before the write",
      "Vendor status kept as received, not trusted as a quality signal",
    ],
    implementation: [
      "Upload the three source files as tables in databricksprojects.greengrid: bronze_readings, bronze_pii and bronze_plans.",
      "Read each Bronze table into a PySpark DataFrame and inspect it with display().",
      "Create notebook widgets for peak_multiplier, From_Peak and To_Peak.",
      "Build the Silver DataFrame: filter the kWh range, join the customer and plan tables, hash the email, derive the hour, apply the peak rate and calculate Bill_Amount.",
      "Write the result to Silver_SmartBill with overwrite.",
      "Build the quarantine DataFrame from the out-of-range readings, add Rejection_Reason and write it to quarantine_readings.",
      "Check the table lineage in Unity Catalog.",
      "Build the Smart Bill Insights dashboard on Silver_SmartBill.",
    ],
    screenshots: [
      {
        src: `${BASE}/01-upload-source-files.png`,
        alt: "Databricks Create or modify table from files page with the customer_pii, meter_readings.json and pricing_plans files selected",
        caption: "Step 1: the three source files uploaded as Bronze tables",
      },
      {
        src: `${BASE}/02-greengrid-schema-tables.png`,
        alt: "Catalog Explorer showing the greengrid schema with its Bronze, quarantine and Silver tables",
        caption: "The greengrid schema in Unity Catalog",
      },
      {
        src: `${BASE}/03-read-bronze-readings.png`,
        alt: "Notebook cell reading bronze_readings with a table of kwh, meter_id, status and timestamp",
        caption: "Step 2: reading the Bronze meter readings",
      },
      {
        src: `${BASE}/04-read-bronze-pii.png`,
        alt: "Notebook cell reading bronze_pii showing MeterID, PlanID and CustomerEmail",
        caption: "Bronze customer table with the email in plain text, before hashing",
      },
      {
        src: `${BASE}/05-read-bronze-plans.png`,
        alt: "Notebook cell reading bronze_plans showing the Saver and Eco-Green plans with their base price per kWh",
        caption: "Bronze pricing plans",
      },
      {
        src: `${BASE}/06-widgets-peak-window.png`,
        alt: "Notebook widgets From_Peak, Peak Multiplier and To_Peak, and the code that creates them",
        caption: "Step 3: widgets control the peak window and multiplier",
      },
      {
        src: `${BASE}/07-silver-transformation-code.png`,
        alt: "PySpark code building silver_df with a kWh filter, joins, sha2 hash, FinalRate and Bill_Amount",
        caption: "Step 4: the Silver transformation",
      },
      {
        src: `${BASE}/08-silver-dataframe-output.png`,
        alt: "Output table of silver_df with PlanID, kwh, meter_id, status, timestamp and Customer_hash",
        caption: "Silver DataFrame output: the email is now a hash",
      },
      {
        src: `${BASE}/09-write-silver-and-quarantine.png`,
        alt: "Notebook cell writing Silver_SmartBill and building and writing the quarantine_readings table",
        caption: "Steps 5 and 6: writing the Silver and quarantine tables",
      },
      {
        src: `${BASE}/10-silver-smartbill-sample-hash.png`,
        alt: "Sample data of the silver_smartbill table in Catalog Explorer showing PlanID, kwh, meter_id, status, timestamp and Customer_hash",
        caption: "silver_smartbill sample: identifiers and the hashed customer",
      },
      {
        src: `${BASE}/11-silver-smartbill-sample-billing.png`,
        alt: "Sample data of the silver_smartbill table showing PlanName, BasePricePerKwh, Hour, FinalRate and Bill_Amount",
        caption: "silver_smartbill sample: base price, hour, FinalRate and Bill_Amount",
      },
      {
        src: `${BASE}/12-unity-catalog-lineage.png`,
        alt: "Unity Catalog lineage graph linking bronze_pii, bronze_plans and bronze_readings to silver_smartbill, and bronze_readings to quarantine_readings",
        caption: "Step 7: lineage from the Bronze tables to Silver and quarantine",
      },
      {
        src: `${BASE}/13-dashboard-kpis-trend.png`,
        alt: "Smart Bill Insights dashboard with total bill amount, total energy, meters and average rate counters, and a daily bill amount trend",
        caption: "Step 8: dashboard counters and daily bill trend",
      },
      {
        src: `${BASE}/14-dashboard-plan-and-hour.png`,
        alt: "Smart Bill Insights dashboard with bill amount by plan and energy consumption by hour charts",
        caption: "Dashboard: bill amount by plan and energy by hour",
      },
    ],
    transformations: [
      {
        title: "Read the Bronze tables",
        description:
          "The three uploaded tables are read as DataFrames. Bronze stays untouched; every later step builds new tables from these.",
        language: "python",
        code: `readings_df = spark.read.table("databricksprojects.greengrid.bronze_readings")
pii_df = spark.read.table("databricksprojects.greengrid.bronze_pii")
plans_df = spark.read.table("databricksprojects.greengrid.bronze_plans")`,
      },
      {
        title: "Widgets for the peak rate",
        description:
          "The peak multiplier and the peak window are notebook widgets, so the business can test a different rate or window without editing the transformation.",
        language: "python",
        code: `from pyspark.sql.functions import *

dbutils.widgets.text("peak_multiplier", "2", "Peak Multiplier")
peak_multiplier = dbutils.widgets.get("peak_multiplier")
dbutils.widgets.dropdown("From_Peak", "18", ["18", "19", "20", "21"])
dbutils.widgets.dropdown("To_Peak", "18", ["18", "19", "20", "21"])
From_peak = dbutils.widgets.get("From_Peak")
To_peak = dbutils.widgets.get("To_Peak")`,
      },
      {
        title: "Quality filter, hash and peak-aware billing",
        description:
          "One chain builds the Silver table. Only readings above 0 and below 100 kWh are kept. The customer email is hashed with SHA-256 and the raw email and MeterID are dropped. FinalRate is the base price, multiplied inside the peak window, and Bill_Amount is kWh times FinalRate.",
        language: "python",
        code: `silver_df = (
    readings_df
    .filter((col("kwh") > 0) & (col("kwh") < 100))
    .join(pii_df, readings_df.meter_id == pii_df.MeterID, "left")
    .withColumn("Customer_hash", sha2(col("CustomerEmail"), 256))
    .join(plans_df, "PlanID", "left")
    .drop("CustomerEmail", "MeterID")
    .withColumn("Hour", hour(col("timestamp")))
    .withColumn(
        "FinalRate",
        when(
            (col("Hour") > From_peak) & (col("Hour") < To_peak),
            col("BasePricePerKwh") * peak_multiplier,
        ).otherwise(col("BasePricePerKwh")),
    )
    .withColumn("Bill_Amount", round(col("kwh") * col("FinalRate"), 2))
)`,
      },
      {
        title: "Write Silver and quarantine the rejects",
        description:
          "The billing table is written with overwrite. Readings outside the range are kept in quarantine_readings with a Rejection_Reason instead of being dropped, so every rejected reading can be reviewed.",
        language: "python",
        code: `silver_df.write.mode("overwrite").saveAsTable("databricksprojects.greengrid.Silver_SmartBill")

quarantine_df = readings_df.filter(
    (col("kwh") < 0) | (col("kwh") > 100)
).withColumn(
    "Rejection_Reason",
    when(col("kwh") < 0, "Negative Readings").otherwise("Overload"),
)
quarantine_df.write.mode("overwrite").saveAsTable("databricksprojects.greengrid.quarantine_readings")`,
      },
    ],
    dataQuality: {
      invalidRecords:
        "A reading below 0 kWh is rejected as a negative reading and one above 100 kWh as an overload. In the scenario data these include phantom spikes of up to 9,000 kWh that the vendor status flag still marks as OK.",
      dataValidation:
        "Only readings above 0 and below 100 kWh reach billing. Bill_Amount is calculated after the filter, so a rejected reading cannot produce a bill.",
      quarantine:
        "quarantine_readings keeps the original columns (kwh, meter_id, status, timestamp) and adds Rejection_Reason (Negative Readings or Overload). The vendor status is kept as received.",
    },
    result:
      "Three raw files become two governed tables, Silver_SmartBill and quarantine_readings, plus a billing dashboard.",
    results: [
      "Silver_SmartBill has 11 columns, including a SHA-256 Customer_hash and no raw email column.",
      "quarantine_readings has 5 columns: the 4 reading columns plus Rejection_Reason.",
      "Unity Catalog lineage shows bronze_readings, bronze_pii and bronze_plans feeding Silver_SmartBill, and bronze_readings feeding quarantine_readings.",
      "The Smart Bill Insights dashboard covers 100 meters, with a total bill amount of 13.33K, 75.79K kWh of energy and an average rate of 0.18 per kWh.",
    ],
    learnings: [
      "Why quality checks run before billing: a bad reading that reaches Bill_Amount produces a wrong bill silently.",
      "Hashing keeps the customer identifier usable for joins and counts while the email itself is never stored in Silver.",
      "Widgets turn business assumptions such as the peak window and multiplier into inputs instead of hard-coded values.",
      "Unity Catalog lineage gives an audit trail of which Bronze tables each Silver table was built from.",
    ],
    // github: "https://github.com/Umeshcoder3003/<repo-name>",
  },
];
