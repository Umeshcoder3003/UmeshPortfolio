import { exploring } from "@/data/profile";
import { Section } from "./ui/Section";
import { iconMap } from "./ui/TechIcon";

export function Learning() {
  return (
    <Section
      id="learning"
      title="Currently Exploring"
      intro="Ongoing professional development in the platforms and patterns behind modern data engineering."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {exploring.map((e) => {
          const Icon = iconMap[e.icon];
          return (
            <li key={e.name} className="rounded-xl border border-line bg-surface p-5">
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold">{e.name}</h3>
              <p className="mt-1 text-sm text-muted">{e.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
