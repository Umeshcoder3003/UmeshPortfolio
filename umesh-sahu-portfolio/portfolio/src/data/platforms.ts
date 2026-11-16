import { projects } from "@/data/projects";
import type { Project } from "@/types";

/**
 * Platform groups shown on the home page (parent: "Platforms").
 * Order here = order on the page.
 * A project with no `platform` field counts as Fabric, so existing
 * entries in projects.ts need no changes.
 * A group with no projects shows a "coming soon" note.
 */
export const platforms = [
  { id: "fabric", label: "Microsoft Fabric" },
  { id: "databricks", label: "Databricks" },
] as const;

export const projectsOn = (id: string): Project[] =>
  projects.filter((p) => (p.platform ?? "fabric") === id);
