import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";
import { Container } from "./ui/Section";

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Data Engineer.
        </p>
        <ul className="flex gap-5">
          <li>
            <a className="hover:text-accent" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          {!isPlaceholder(site.github) && (
            <li>
              <a className="hover:text-accent" href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          )}
          <li>
            <a className="hover:text-accent" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
