import { Download, Mail } from "lucide-react";
import { site, heroBadges } from "@/data/site";
import { resolveLink } from "@/lib/utils";
import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Section";
import { TechBadge } from "./ui/TechBadge";
import { LinkedinIcon } from "./ui/BrandIcons";
import { PipelineVisual } from "./PipelineVisual";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Hi, I&apos;m {site.name}
            </h1>
            <p className="mt-4 font-display text-lg font-medium text-accent sm:text-xl">
              {site.headline}
            </p>
            <p className="mt-5 max-w-xl text-lg text-muted">{site.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href="/#case-studies">View Case Studies</ButtonLink>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-1 gap-y-1">
              <ButtonLink
                href={resolveLink(site.resume, "/#contact")}
                variant="ghost"
                icon={<Download className="h-4 w-4" aria-hidden="true" />}
              >
                Download Resume
              </ButtonLink>
              <ButtonLink
                href={site.linkedin}
                variant="ghost"
                icon={<LinkedinIcon className="h-4 w-4" />}
              >
                LinkedIn
              </ButtonLink>
              <ButtonLink
                href="/#contact"
                variant="ghost"
                icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              >
                Contact Me
              </ButtonLink>
            </div>
          </div>

          <PipelineVisual />
        </div>

        <ul className="mt-14 flex flex-wrap gap-2" aria-label="Core technologies">
          {heroBadges.map((b) => (
            <li key={b}>
              <TechBadge name={b} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
