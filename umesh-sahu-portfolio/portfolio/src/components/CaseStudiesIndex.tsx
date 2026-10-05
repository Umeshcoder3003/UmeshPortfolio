import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "./ui/Section";

export function CaseStudiesIndex() {
  return (
    <Section
      id="case-studies"
      title="Case Studies"
      intro="Each case study walks through the problem, architecture, transformations, data quality rules and what I learned."
      tone="alt"
    >
      <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex flex-col gap-2 p-5 transition-colors hover:bg-surface2/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-lg font-semibold group-hover:text-accent">{p.title}</h3>
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
    </Section>
  );
}
