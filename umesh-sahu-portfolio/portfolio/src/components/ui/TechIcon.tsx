import {
  Database, Braces, Zap, Layers, Cloud, Waves, Warehouse, Boxes, Workflow,
  ShieldCheck, ListChecks, Download, HardDrive, Server, BarChart3, Table2,
  Plug, FileText, Gem, type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/types";

export const iconMap: Record<IconKey, LucideIcon> = {
  source: Database,
  ingestion: Download,
  bronze: Layers,
  silver: Layers,
  gold: Gem,
  validation: ShieldCheck,
  quality: ListChecks,
  transform: Workflow,
  storage: HardDrive,
  serving: Server,
  analytics: BarChart3,
  curated: Gem,
  sql: Database,
  oracle: Database,
  python: Braces,
  spark: Zap,
  fabric: Layers,
  databricks: Boxes,
  azure: Cloud,
  lake: Waves,
  warehouse: Warehouse,
  api: Plug,
  file: FileText,
};

/** Picks an icon from a technology name, e.g. "Microsoft Fabric" -> Layers. */
export function techIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("spark")) return Zap;
  if (n.includes("fabric")) return Layers;
  if (n.includes("databricks")) return Boxes;
  if (n.includes("azure") || n.includes("cloud")) return Cloud;
  if (n.includes("python")) return Braces;
  if (n.includes("etl") || n.includes("pipeline")) return Workflow;
  if (n.includes("model")) return Table2;
  if (n.includes("lake")) return Waves;
  if (n.includes("warehouse")) return Warehouse;
  return Database;
}
