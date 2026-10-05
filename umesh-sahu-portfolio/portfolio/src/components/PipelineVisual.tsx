import { Database, Layers, Gem } from "lucide-react";

const stages = [
  { label: "Source", left: "0%", icon: Database, box: "border-muted/60 text-muted" },
  { label: "Bronze", left: "33.333%", icon: Layers, box: "border-bronze/70 bg-bronze/10 text-bronze" },
  { label: "Silver", left: "66.666%", icon: Layers, box: "border-silver/70 bg-silver/10 text-silver" },
  { label: "Gold", left: "100%", icon: Gem, box: "border-gold/70 bg-gold/10 text-gold" },
];

const records = [
  { id: "emp_id 1042", note: "valid", to: "silver", tone: "text-accent" },
  { id: "emp_id null", note: "missing key", to: "quarantine", tone: "text-warn" },
  { id: "emp_id 1042", note: "duplicate", to: "dropped", tone: "text-muted" },
];

export function PipelineVisual() {
  return (
    <div className="rounded-xl border border-line bg-surface/80 p-5 shadow-sm backdrop-blur sm:p-6">
      <div
        role="img"
        aria-label="Illustration: records flow from source through bronze, silver and gold layers; an invalid record is sent to quarantine."
        className="relative mx-6 h-32 sm:mx-10"
      >
        <div className="absolute inset-x-0 top-8 h-px bg-line" />

        {stages.map(({ label, left, icon: Icon, box }) => (
          <div
            key={label}
            className="absolute top-2 flex -translate-x-1/2 flex-col items-center gap-1.5"
            style={{ left }}
          >
            <span className={`grid h-12 w-12 place-items-center rounded-lg border bg-surface ${box}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-ink/80">{label}</span>
          </div>
        ))}

        <span
          className="absolute left-1/2 top-[5.5rem] -translate-x-1/2 translate-y-2 rounded border border-warn/50 bg-warn/10 px-2 py-0.5 text-[11px] text-warn"
          aria-hidden="true"
        >
          quarantine
        </span>

        {[0, 1.2, 2.4].map((delay) => (
          <span
            key={delay}
            aria-hidden="true"
            className="animate-flow absolute top-8 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ animationDelay: `${delay}s`, opacity: 0 }}
          />
        ))}
        <span
          aria-hidden="true"
          className="animate-flow-bad absolute top-8 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        />
      </div>

      <div className="mt-2 border-t border-line pt-4">
        <p className="mb-2 text-sm text-muted">Sample record handling (illustrative)</p>
        <ul className="space-y-1.5 font-mono text-xs">
          {records.map((r, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded bg-surface2/70 px-3 py-1.5">
              <span className="text-ink/90">{r.id}</span>
              <span className="text-muted">{r.note}</span>
              <span className={r.tone}>{r.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
