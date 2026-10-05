import { about } from "@/data/profile";
import { Section } from "./ui/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-2xl space-y-4 text-lg text-ink/85">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <h3 className="mb-3 text-base font-semibold">Where I work</h3>
          <ul className="flex flex-wrap gap-2">
            {about.focus.map((f) => (
              <li key={f} className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
