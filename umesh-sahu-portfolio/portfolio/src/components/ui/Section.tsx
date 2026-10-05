import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

type Props = {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "plain" | "alt";
};

export function Section({ id, title, intro, children, tone = "plain" }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 md:py-28", tone === "alt" && "border-y border-line bg-surface2/40")}
    >
      <Container>
        <div className="mb-10 max-w-2xl">
          <h2 id={`${id}-title`} className="text-3xl font-semibold md:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
