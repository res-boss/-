"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { LOCALE_LABELS, LOCALES, type Locale } from "@/i18n/config";
import { EASE_EDITORIAL } from "@/lib/motion";
import { cn } from "@/lib/utils";

type NavItem = { key: string; href: string; label: string };

type SiteHeaderProps = {
  locale: Locale;
  brand: string;
  items: NavItem[];
  labels: { menu: string; close: string; language: string };
};

/** Replaces the locale segment of the current path: /ko/artists → /en/artists */
function swapLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  parts[1] = next;
  return parts.join("/") || `/${next}`;
}

function LanguageSwitcher({ locale, pathname, label, className }: { locale: Locale; pathname: string; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={cn("flex items-center gap-3", className)}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-border" />}
          <Link
            href={swapLocale(pathname, l)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "text-[0.6875rem] font-medium tracking-[0.2em] transition-colors duration-500",
              l === locale ? "text-foreground" : "text-subtle hover:text-foreground",
            )}
          >
            {LOCALE_LABELS[l]}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function SiteHeader({ locale, brand, items, labels }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 ease-editorial",
        scrolled && !open ? "border-b border-hairline bg-background/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link href={`/${locale}`} className="relative z-10 text-[0.8125rem] font-semibold uppercase tracking-[0.32em]">
          {brand}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-14 lg:flex">
          <nav className="flex items-center gap-10">
            {items.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-underline pb-0.5 text-[0.75rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher locale={locale} pathname={pathname} label={labels.language} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-10 -mr-2 flex h-11 items-center gap-3 px-2 text-[0.6875rem] font-medium uppercase tracking-[0.24em] lg:hidden"
        >
          {open ? labels.close : labels.menu}
          <span aria-hidden className="relative block h-2.5 w-5">
            <span className={cn("absolute left-0 h-px w-full bg-current transition-all duration-500 ease-editorial", open ? "top-1/2 rotate-45" : "top-0")} />
            <span className={cn("absolute left-0 h-px w-full bg-current transition-all duration-500 ease-editorial", open ? "top-1/2 -rotate-45" : "bottom-0")} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
            className="fixed inset-0 flex flex-col bg-background pt-16 lg:hidden"
          >
            <nav className="container-editorial flex flex-1 flex-col justify-center gap-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: 0.1 + i * 0.07 }}
                >
                  <Link href={item.href} className="block py-3 font-display text-[2.25rem] font-light leading-tight tracking-[-0.01em]">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-editorial border-t border-hairline py-8">
              <LanguageSwitcher locale={locale} pathname={pathname} label={labels.language} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
