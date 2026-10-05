import { highlights } from "@/data/profile";
import { Section } from "./ui/Section";

export function WhatIBring() {
  return (
    <Section id="what-i-bring" title="What I Bring" tone="alt">
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="border-t-2 border-accent/70 pt-4">
            <dt className="font-display text-lg font-semibold">{h.title}</dt>
            <dd className="mt-1.5 text-muted">{h.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
