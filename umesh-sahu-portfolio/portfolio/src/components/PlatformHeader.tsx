import { techIcon } from "./TechIcon";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  blurb?: string;
  count: number;
  size?: "lg" | "md";
};

/** Banner heading for a platform group (Fabric / Databricks). */
export function PlatformHeader({ label, blurb, count, size = "lg" }: Props) {
  const Icon = techIcon(label);
  const big = size === "lg";
  return (
    <div
      className={cn(
        "relative mb-6 flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/15 via-surface to-surface",
        big ? "p-5 sm:p-6" : "p-4",
      )}
    >
      <span className="absolute inset-y-0 left-0 w-1.5 bg-accent" aria-hidden="true" />
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl bg-accent text-accent-ink shadow-sm",
          big ? "ml-2 h-12 w-12" : "ml-2 h-10 w-10",
        )}
      >
        <Icon className={big ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className={cn("font-semibold leading-tight", big ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>
          {label}
        </h3>
        {blurb && <p className="mt-0.5 text-sm text-muted">{blurb}</p>}
      </div>
      <span className="ml-auto rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
        {count} {count === 1 ? "project" : "projects"}
      </span>
    </div>
  );
}
