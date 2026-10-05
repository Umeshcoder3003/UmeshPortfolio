import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  icon?: ReactNode;
  className?: string;
};

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent/90",
  outline: "border border-line bg-surface hover:border-accent/70 hover:text-accent",
  ghost: "text-ink/80 hover:text-accent",
};

export function ButtonLink({ href, children, variant = "outline", icon, className }: Props) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
    variants[variant],
    className,
  );
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (isExternal(href)) {
    const mail = href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={cls}
        {...(mail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
