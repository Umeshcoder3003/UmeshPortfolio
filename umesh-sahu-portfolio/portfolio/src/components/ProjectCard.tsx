import Link from "next/link";
import type { Project } from "@/types";
import { isPlaceholder } from "@/lib/utils";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ButtonLink } from "./ui/ButtonLink";
import { TechBadge } from "./ui/TechBadge";
import { GithubIcon } from "./ui/BrandIcons";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-surface p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold">
          <Link href={`/projects/${p.slug}`} className="hover:text-accent">
            {p.title}
          </Link>
        </h3>
        {p.status === "in-progress" && (
          <span className="shrink-0 rounded-full border border-gold/60 bg-gold/10 px-2.5 py-0.5 text-xs text-gold">
            In progress
          </span>
        )}
      </div>

      <p className="mt-3 text-ink/85">{p.summary}</p>

      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="font-semibold">Business problem</dt>
          <dd className="mt-1 text-muted">{p.businessProblem}</dd>
        </div>
        <div>
          <dt className="mb-2 font-semibold">Architecture</dt>
          <dd>
            <ArchitectureDiagram stages={p.architecture} variant="compact" />
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Key engineering concepts</dt>
          <dd className="mt-1 text-muted">{p.concepts.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-semibold">Data quality techniques</dt>
          <dd className="mt-1 text-muted">{p.dataQualityTechniques.join(", ")}</dd>
        </div>
        {p.result && (
          <div>
            <dt className="font-semibold">Result</dt>
            <dd className="mt-1 text-muted">{p.result}</dd>
          </div>
        )}
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {p.technologies.map((t) => (
          <li key={t}>
            <TechBadge name={t} />
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <ButtonLink href={`/projects/${p.slug}`} variant="primary">
          View Case Study
        </ButtonLink>
        {p.github && !isPlaceholder(p.github) && (
          <ButtonLink href={p.github} icon={<GithubIcon className="h-4 w-4" />}>
            GitHub
          </ButtonLink>
        )}
      </div>
    </article>
  );
}
