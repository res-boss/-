import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { site } from "@/content/site";
import { t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { navItems } from "./nav-items";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const legal = [
    { label: dict.footer.company, value: t(site.legal.companyName, locale) },
    { label: dict.footer.ceo, value: t(site.legal.ceo, locale) },
    { label: dict.footer.businessNumber, value: site.legal.businessNumber },
    { label: dict.footer.address, value: t(site.legal.address, locale) },
  ].filter((row) => row.value);

  return (
    <footer className="bg-inverse text-inverse-foreground">
      <Container className="pt-24 pb-10 md:pt-32">
        <div className="grid-editorial gap-y-14">
          <div className="col-span-full lg:col-span-5">
            <p className="font-display text-title font-light">{t(site.name, locale)}</p>
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="link-underline mt-6 inline-block text-body text-inverse-foreground/70">
                {site.contact.email}
              </a>
            )}
          </div>

          <nav className="col-span-2 flex flex-col gap-3 md:col-span-3 lg:col-span-3 lg:col-start-7">
            {navItems(dict, locale).map((item) => (
              <Link key={item.key} href={item.href} className="link-underline w-fit text-caption uppercase tracking-[0.2em] text-inverse-foreground/70 hover:text-inverse-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          {site.socials.length > 0 && (
            <ul className="col-span-2 flex flex-col gap-3 md:col-span-3 lg:col-span-3">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-underline text-caption uppercase tracking-[0.2em] text-inverse-foreground/70 hover:text-inverse-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Separator className="mt-20 bg-inverse-foreground/10" />

        <div className="mt-8 flex flex-col gap-6 text-[0.75rem] leading-relaxed tracking-[0.02em] text-inverse-foreground/45 md:flex-row md:items-end md:justify-between">
          {legal.length > 0 && (
            <dl className="flex flex-wrap gap-x-6 gap-y-1">
              {legal.map((row) => (
                <div key={row.label} className="flex gap-2">
                  <dt>{row.label}</dt>
                  <dd className="text-inverse-foreground/65">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="shrink-0">
            © {new Date().getFullYear()} {t(site.name, "en")}. {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
