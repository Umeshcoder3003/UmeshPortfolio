import { processSteps } from "@/data/profile";
import { Section } from "./ui/Section";

export function HowISolve() {
  return (
    <Section
      id="how-i-solve"
      title="How I Solve Data Problems"
      intro="The same sequence applies whether the tool is PL/SQL or PySpark."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <li key={s.title} className="relative rounded-xl border border-line bg-surface p-5">
            <span className="font-mono text-sm text-accent">Step {i + 1}</span>
            <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
