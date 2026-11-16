import { platforms, projectsOn } from "@/data/platforms";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./ui/Section";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Data Engineering Projects"
      intro="Pipelines built around a real data problem: where the data comes from, how it is validated, and what comes out the other end."
    >
      {/* Parent: Platforms */}
      <nav aria-label="Platforms" className="mb-12 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted">Platforms</span>
        {platforms.map((pl) => (
          <a
            key={pl.id}
            href={`#projects-${pl.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {pl.label}
            <span className="text-muted">{projectsOn(pl.id).length}</span>
          </a>
        ))}
      </nav>

      {/* Children: Fabric, Databricks */}
      {platforms.map((pl) => {
        const list = projectsOn(pl.id).filter((p) => p.featured ?? true);
        return (
          <div key={pl.id} id={`projects-${pl.id}`} className="mb-14 last:mb-0">
            <h3 className="mb-6 flex items-center gap-3 border-b border-line pb-3 text-2xl font-semibold">
              <span className="h-6 w-1 rounded-full bg-accent" aria-hidden="true" />
              {pl.label}
              <span className="text-sm font-normal text-muted">
                {list.length} {list.length === 1 ? "project" : "projects"}
              </span>
            </h3>
            {list.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line p-8 text-center text-muted">
                {pl.label} case studies are coming soon.
              </p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {list.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <p className="mt-8 text-sm text-muted">
        New projects are added here as they are built and documented.
      </p>
    </Section>
  );
}
