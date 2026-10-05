import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="py-32">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">That page does not exist. Head back to the projects list.</p>
      <div className="mt-6">
        <ButtonLink href="/#projects" variant="primary">
          View Projects
        </ButtonLink>
      </div>
    </Container>
  );
}
