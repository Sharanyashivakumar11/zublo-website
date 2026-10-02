"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { pageNavLinks } from "@/data/site-nav";
import { siteNav } from "@/data/site-nav";

const mainNavLinks = [
  { label: "Home", href: siteNav.home },
  { label: "Services", href: siteNav.services },
  { label: "Work", href: siteNav.work },
  { label: "90 Days", href: siteNav.ninetyDays, current: true },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-warm-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href={siteNav.home} className="shrink-0" aria-label="Zublo home">
          <Image
            src="/zublo-logo.svg"
            alt="Zublo"
            width={120}
            height={34}
            priority
            className="h-8 w-auto md:h-9"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {mainNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={"current" in link && link.current ? "page" : undefined}
              className={
                "current" in link && link.current
                  ? "text-sm font-bold text-ink underline decoration-accent-orange decoration-2 underline-offset-4"
                  : "text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
              }
            >
              {link.label}
            </a>
          ))}
          <span className="h-4 w-px bg-ink/20" aria-hidden />
          {pageNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Button href={siteNav.contact} variant="secondary" className="!px-4 !py-2 text-sm">
            Let&apos;s Talk
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border-[3px] border-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t-[3px] border-ink bg-warm-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {mainNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {pageNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-ink/70"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button href={siteNav.contact} variant="secondary" className="w-full">
              Let&apos;s Talk
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
