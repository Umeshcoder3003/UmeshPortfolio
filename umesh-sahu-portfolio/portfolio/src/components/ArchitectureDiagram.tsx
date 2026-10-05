import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import type { ArchitectureStage } from "@/types";
import { cn } from "@/lib/utils";
import { iconMap } from "./ui/TechIcon";

const layerClass = {
  bronze: "border-bronze/60 bg-bronze/10 text-bronze",
  silver: "border-silver/60 bg-silver/10 text-silver",
  gold: "border-gold/60 bg-gold/10 text-gold",
  none: "border-line bg-surface2 text-accent",
} as const;

type Props = { stages: ArchitectureStage[]; variant?: "full" | "compact" };

export function ArchitectureDiagram({ stages, variant = "full" }: Props) {
  if (variant === "compact") {
    return (
      <ol className="flex flex-wrap items-center gap-1.5 text-xs" aria-label="Pipeline stages">
        {stages.map((s, i) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={cn("rounded border px-2 py-1", layerClass[s.layer ?? "none"])}>
              {s.label}
            </span>
            {i < stages.length - 1 && (
              <ChevronRight className="h-3 w-3 text-muted" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol
      aria-label="Architecture diagram"
      className="flex flex-col items-stretch md:flex-row md:items-stretch md:overflow-x-auto md:pb-3"
    >
      {stages.map((s, i) => {
        const Icon = iconMap[s.icon];
        const last = i === stages.length - 1;
        return (
          <li key={s.label} className="flex flex-col items-center md:shrink-0 md:flex-row">
            <div
              className={cn(
                "flex w-full flex-col items-center gap-2 rounded-lg border p-4 text-center md:w-40",
                layerClass[s.layer ?? "none"],
              )}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className="text-sm font-medium text-ink">{s.label}</span>
              {s.detail && <span className="text-xs text-muted">{s.detail}</span>}
            </div>
            {!last && (
              <>
                <ArrowDown className="my-1.5 h-4 w-4 text-muted md:hidden" aria-hidden="true" />
                <ArrowRight className="mx-2 hidden h-4 w-4 shrink-0 text-muted md:block" aria-hidden="true" />
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
