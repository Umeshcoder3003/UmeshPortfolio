import { certifications } from "@/data/profile";
import { Section } from "./ui/Section";

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications" tone="alt">
      {certifications.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.name} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {c.issuer}
                {c.year ? `, ${c.year}` : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-xl border border-dashed border-line p-5 text-muted">
              <p className="font-medium">[CERTIFICATION_NAME]</p>
              <p className="mt-1 text-sm">[ISSUER], [YEAR]</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
