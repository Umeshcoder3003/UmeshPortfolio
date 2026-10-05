import { skillGroups } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Section } from "./ui/Section";
import { iconMap } from "./ui/TechIcon";

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="Grouped by what they are used for. The marker shows where each skill comes from."
    >
      <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="Legend">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          Used in professional work
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-accent" aria-hidden="true" />
          Built through hands-on projects
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => {
          const Icon = iconMap[g.icon];
          return (
            <article key={g.title} className="rounded-xl border border-line bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{g.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted">{g.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="inline-flex items-center gap-2 rounded-md border border-line bg-bg px-2.5 py-1 text-sm"
                    title={s.level === "professional" ? "Used in professional work" : "Built through hands-on projects"}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        s.level === "professional" ? "bg-accent" : "border-[1.5px] border-accent",
                      )}
                      aria-hidden="true"
                    />
                    {s.name}
                    <span className="sr-only">
                      {s.level === "professional" ? " (professional)" : " (hands-on projects)"}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
