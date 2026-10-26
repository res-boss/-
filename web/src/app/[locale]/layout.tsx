import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { MotionProvider } from "@/components/motion/motion-provider";
import { navItems } from "@/components/site/nav-items";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { site } from "@/content/site";
import { HTML_LANG, isLocale, LOCALES, OG_LOCALE, t } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { displayLatin, pretendard } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "../globals.css";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const name = t(site.name, locale);

  return {
    metadataBase: new URL("https://www.redstartenm.com"),
    title: { default: name, template: `%s — ${name}` },
    description: t(site.tagline, locale) || dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}`])),
    },
    openGraph: { siteName: name, locale: OG_LOCALE[locale], type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#141312" },
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={HTML_LANG[locale]} className={cn(pretendard.variable, displayLatin.variable)} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {dict.nav.skipToContent}
        </a>
        <MotionProvider>
          <SiteHeader
            locale={locale}
            brand={t(site.name, "en")}
            items={navItems(dict, locale)}
            labels={{ menu: dict.nav.menu, close: dict.nav.close, language: dict.nav.language }}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
