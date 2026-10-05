import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./ui/Section";

export function Projects() {
  const featured = projects.filter((p) => p.featured ?? true);
  return (
    <Section
      id="projects"
      title="Data Engineering Projects"
      intro="Pipelines built around a real data problem: where the data comes from, how it is validated, and what comes out the other end."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        New projects are added here as they are built and documented.
      </p>
    </Section>
  );
}
