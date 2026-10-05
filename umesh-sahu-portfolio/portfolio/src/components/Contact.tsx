import { Download, Mail } from "lucide-react";
import { site } from "@/data/site";
import { isPlaceholder, resolveLink } from "@/lib/utils";
import { ButtonLink } from "./ui/ButtonLink";
import { Section } from "./ui/Section";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

export function Contact() {
  return (
    <Section id="contact" title="Let's Connect">
      <p className="max-w-2xl text-lg text-ink/85">
        Interested in Data Engineering, data platforms, ETL, SQL or building reliable data
        solutions? Feel free to connect with me.
      </p>
      <p className="mt-4 text-muted">
        Email:{" "}
        <a className="text-accent hover:underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={site.linkedin} variant="primary" icon={<LinkedinIcon className="h-4 w-4" />}>
          LinkedIn
        </ButtonLink>
        <ButtonLink href={`mailto:${site.email}`} icon={<Mail className="h-4 w-4" aria-hidden="true" />}>
          Email
        </ButtonLink>
        {!isPlaceholder(site.github) && (
          <ButtonLink href={site.github} icon={<GithubIcon className="h-4 w-4" />}>
            GitHub
          </ButtonLink>
        )}
        <ButtonLink
          href={resolveLink(site.resume, "/#contact")}
          icon={<Download className="h-4 w-4" aria-hidden="true" />}
        >
          Download Resume
        </ButtonLink>
      </div>
    </Section>
  );
}
