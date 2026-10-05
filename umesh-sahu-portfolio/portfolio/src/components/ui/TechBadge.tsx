import { techIcon } from "./TechIcon";
import { cn } from "@/lib/utils";

export function TechBadge({ name, className }: { name: string; className?: string }) {
  const Icon = techIcon(name);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink/90",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
      {name}
    </span>
  );
}
