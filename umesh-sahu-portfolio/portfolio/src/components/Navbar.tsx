"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site, nav } from "@/data/site";
import { isExternal, resolveLink } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string };

function NavLink({ item, className, onClick }: { item: Item; className: string; onClick?: () => void }) {
  if (isExternal(item.href)) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const items: Item[] = nav.map((n) =>
    n.href === "resume" ? { label: n.label, href: resolveLink(site.resume, "/#contact") } : n,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/#home" className="font-display text-lg font-semibold tracking-tight">
          {site.name}
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {items.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className="rounded-md px-3 py-2 text-sm text-ink/75 transition-colors hover:text-accent"
            />
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg xl:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {items.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-base text-ink/85 last:border-0"
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
