import { experience } from "@/data/profile";
import { Section } from "./ui/Section";

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold text-ink">{title}</h4>
      <ul className="list-disc space-y-1.5 pl-5 text-ink/85 marker:text-accent">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      title="Professional Experience"
      intro="Where I have applied SQL, Oracle and data engineering in real systems."
      tone="alt"
    >
      <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
        {experience.map((e) => (
          <li key={`${e.company}-${e.role}`} className="relative">
            <span
              className="absolute -left-[1.95rem] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-[2.45rem]"
              aria-hidden="true"
            />
            <article className="rounded-xl border border-line bg-surface p-6">
              {e.placeholder && (
                <p className="mb-4 rounded-md border border-dashed border-warn/60 bg-warn/10 px-3 py-2 text-sm text-warn">
                  Placeholder entry. Replace it with your real details in src/data/profile.ts.
                </p>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold">
                  {e.role} <span className="text-muted">at {e.company}</span>
                </h3>
                <p className="text-sm text-muted">{e.duration}</p>
              </div>
              <p className="mt-1 text-sm text-accent">{e.domain}</p>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <List title="Responsibilities" items={e.responsibilities} />
                <List title="Technical contributions" items={e.contributions} />
              </div>
              {e.achievements.length > 0 && (
                <div className="mt-6">
                  <List title="Achievements" items={e.achievements} />
                </div>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
