import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/types";
import { isPlaceholder } from "@/lib/utils";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Section";
import { TechBadge } from "./ui/TechBadge";
import { GithubIcon } from "./ui/BrandIcons";

const dqLabels: Record<keyof NonNullable<Project["dataQuality"]>, string> = {
  nullHandling: "Null handling",
  duplicateHandling: "Duplicate handling",
  invalidRecords: "Invalid records",
  schemaValidation: "Schema validation",
  dataValidation: "Data validation",
  quarantine: "Quarantine logic",
};

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line pt-8">
      <h2 id={`${id}-title`} className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Expandable({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group rounded-lg border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-medium">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="space-y-3 border-t border-line p-4 text-ink/85">{children}</div>
    </details>
  );
}

export function CaseStudy({ project: p }: { project: Project }) {
  const dq = p.dataQuality ? (Object.entries(p.dataQuality) as [keyof typeof dqLabels, string | undefined][]).filter(([, v]) => v) : [];
  const results = p.results?.length ? p.results : p.result ? [p.result] : [];
  const hasGithub = p.github && !isPlaceholder(p.github);

  const toc: { id: string; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Business problem" },
    ...(p.objective ? [{ id: "objective", label: "Objective" }] : []),
    ...(p.dataset ? [{ id: "dataset", label: "Dataset" }] : []),
    { id: "architecture", label: "Architecture" },
    { id: "technologies", label: "Technologies" },
    ...(p.implementation?.length ? [{ id: "implementation", label: "Implementation" }] : []),
    ...(p.screenshots?.length ? [{ id: "walkthrough", label: "Walkthrough" }] : []),
    ...(p.transformations?.length ? [{ id: "transformations", label: "Data transformations" }] : []),
    { id: "data-quality", label: "Data quality" },
    ...(p.challenges?.length ? [{ id: "challenges", label: "Challenges & solutions" }] : []),
    ...(results.length ? [{ id: "results", label: "Results" }] : []),
    ...(p.learnings?.length ? [{ id: "learnings", label: "Key learnings" }] : []),
    ...(hasGithub ? [{ id: "github", label: "GitHub" }] : []),
  ];

  return (
    <Container className="py-10 md:py-14">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <p className="mb-3 text-sm font-semibold">On this page</p>
            <ul className="space-y-2 border-l border-line text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-accent hover:text-accent">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 space-y-10">
          <header id="overview" className="scroll-mt-24">
            {p.status === "in-progress" && (
              <p className="mb-3 inline-block rounded-full border border-gold/60 bg-gold/10 px-3 py-0.5 text-sm text-gold">
                Case study in progress
              </p>
            )}
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">{p.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{p.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {p.technologies.map((t) => (
                <li key={t}>
                  <TechBadge name={t} />
                </li>
              ))}
            </ul>
            {hasGithub && (
              <div className="mt-6">
                <ButtonLink href={p.github as string} icon={<GithubIcon className="h-4 w-4" />}>
                  View repository
                </ButtonLink>
              </div>
            )}
          </header>

          <Block id="problem" title="Business problem">
            <p className="max-w-2xl text-lg text-ink/85">{p.businessProblem}</p>
          </Block>

          {p.objective && (
            <Block id="objective" title="Objective">
              <p className="max-w-2xl text-lg text-ink/85">{p.objective}</p>
            </Block>
          )}

          {p.dataset && (
            <Block id="dataset" title="Dataset">
              <p className="max-w-2xl text-ink/85">
                <span className="font-semibold">Source:</span> {p.dataset.source}
              </p>
              {p.dataset.structure && (
                <p className="mt-2 max-w-2xl text-ink/85">
                  <span className="font-semibold">Structure:</span> {p.dataset.structure}
                </p>
              )}
              {p.dataset.fields && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.dataset.fields.map((f) => (
                    <li key={f} className="rounded border border-line bg-surface px-2 py-1 font-mono text-xs">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </Block>
          )}

          <Block id="architecture" title="Architecture and data flow">
            <ArchitectureDiagram stages={p.architecture} />
          </Block>

          <Block id="technologies" title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li key={t}>
                  <TechBadge name={t} />
                </li>
              ))}
            </ul>
            {p.concepts.length > 0 && (
              <p className="mt-4 max-w-2xl text-muted">
                Engineering concepts demonstrated: {p.concepts.join(", ")}.
              </p>
            )}
          </Block>

          {p.implementation && p.implementation.length > 0 && (
            <Block id="implementation" title="Implementation">
              <ol className="max-w-2xl list-decimal space-y-2 pl-5 text-ink/85 marker:text-accent">
                {p.implementation.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </Block>
          )}

          {p.screenshots && p.screenshots.length > 0 && (
            <Block id="walkthrough" title="Walkthrough">
              <ol className="space-y-8">
                {p.screenshots.map((shot, i) => (
                  <li key={shot.src}>
                    <figure>
                      <a
                        href={shot.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open full size: ${shot.alt}`}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={1600}
                          height={900}
                          sizes="(min-width: 1024px) 800px, 100vw"
                          className="h-auto w-full rounded-lg border border-line bg-surface"
                        />
                      </a>
                      <figcaption className="mt-2 text-sm text-muted">
                        <span className="font-mono text-accent">Step {i + 1}</span>
                        {shot.caption ? `: ${shot.caption}` : ""}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {p.transformations && p.transformations.length > 0 && (
            <Block id="transformations" title="Data transformations">
              <div className="space-y-3">
                {p.transformations.map((t, i) => (
                  <Expandable key={t.title} title={t.title} open={i === 0}>
                    <p>{t.description}</p>
                    {t.code && (
                      <pre className="overflow-x-auto rounded-md border border-line bg-bg p-4 font-mono text-sm leading-relaxed">
                        <code>{t.code}</code>
                      </pre>
                    )}
                  </Expandable>
                ))}
              </div>
            </Block>
          )}

          <Block id="data-quality" title="Data quality">
            {p.dataQualityTechniques.length > 0 && (
              <ul className="mb-5 flex flex-wrap gap-2">
                {p.dataQualityTechniques.map((t) => (
                  <li key={t} className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {dq.length > 0 && (
              <dl className="grid gap-4 sm:grid-cols-2">
                {dq.map(([key, value]) => (
                  <div key={key} className="rounded-lg border border-line bg-surface p-4">
                    <dt className="font-semibold">{dqLabels[key]}</dt>
                    <dd className="mt-1 text-sm text-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Block>

          {p.challenges && p.challenges.length > 0 && (
            <Block id="challenges" title="Challenges and solutions">
              <div className="space-y-3">
                {p.challenges.map((c, i) => (
                  <Expandable key={c.challenge} title={c.challenge} open={i === 0}>
                    <p>
                      <span className="font-semibold">Solution:</span> {c.solution}
                    </p>
                  </Expandable>
                ))}
              </div>
            </Block>
          )}

          {results.length > 0 && (
            <Block id="results" title="Results">
              <ul className="max-w-2xl list-disc space-y-2 pl-5 text-ink/85 marker:text-accent">
                {results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Block>
          )}

          {p.learnings && p.learnings.length > 0 && (
            <Block id="learnings" title="Key learnings">
              <ul className="max-w-2xl list-disc space-y-2 pl-5 text-ink/85 marker:text-accent">
                {p.learnings.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Block>
          )}

          {hasGithub && (
            <Block id="github" title="GitHub repository">
              <ButtonLink href={p.github as string} icon={<GithubIcon className="h-4 w-4" />}>
                Open repository
              </ButtonLink>
            </Block>
          )}

          {p.status === "in-progress" && (
            <p className="rounded-lg border border-dashed border-line p-4 text-sm text-muted">
              This case study is still being written. Implementation details, code and results are
              added as the project is documented.
            </p>
          )}
        </article>
      </div>
    </Container>
  );
}
