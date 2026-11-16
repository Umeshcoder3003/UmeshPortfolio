import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { platforms, projectsOn } from "@/data/platforms";
import { Section } from "./ui/Section";

export function CaseStudiesIndex() {
  return (
    <Section
      id="case-studies"
      title="Case Studies"
      intro="Each case study walks through the problem, architecture, transformations, data quality rules and what I learned."
      tone="alt"
    >
      {/* Parent: Platforms. Children: Fabric, Databricks */}
      <h3 className="mb-8 border-b border-line pb-3 text-2xl font-semibold">Platforms</h3>

      {platforms.map((pl) => {
        const list = projectsOn(pl.id);
        return (
          <div key={pl.id} id={`case-studies-${pl.id}`} className="mb-10 last:mb-0">
            <h4 className="mb-4 flex items-center gap-3 text-xl font-semibold">
              <span className="h-5 w-1 rounded-full bg-accent" aria-hidden="true" />
              {pl.label}
              {list.length > 0 && <span className="text-sm font-normal text-muted">{list.length}</span>}
            </h4>
            {list.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line bg-surface p-5 text-muted">
                {pl.label} case studies are coming soon.
              </p>
            ) : (
              <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex flex-col gap-2 p-5 transition-colors hover:bg-surface2/60 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h5 className="font-display text-lg font-semibold group-hover:text-accent">{p.title}</h5>
                        <p className="mt-1 text-sm text-muted">{p.technologies.join(", ")}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                        {p.status === "in-progress" ? "Read the overview" : "Read case study"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </Section>
  );
}
