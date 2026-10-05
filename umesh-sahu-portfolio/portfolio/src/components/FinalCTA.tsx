import { Download, Mail } from "lucide-react";
import { site } from "@/data/site";
import { resolveLink } from "@/lib/utils";
import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Section";
import { LinkedinIcon } from "./ui/BrandIcons";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-line bg-surface2/50 py-20">
      <Container>
        <h2 id="final-cta-title" className="max-w-2xl text-3xl font-semibold md:text-4xl">
          Let&apos;s Build Better Data Solutions
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Interested in Data Engineering, data platforms, ETL, SQL or building reliable data
          solutions? Let&apos;s connect.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.linkedin} variant="primary" icon={<LinkedinIcon className="h-4 w-4" />}>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} icon={<Mail className="h-4 w-4" aria-hidden="true" />}>
            Email Me
          </ButtonLink>
          <ButtonLink href="/#projects">View Projects</ButtonLink>
          <ButtonLink
            href={resolveLink(site.resume, "/#contact")}
            icon={<Download className="h-4 w-4" aria-hidden="true" />}
          >
            Download Resume
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
