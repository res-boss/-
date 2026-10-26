import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArtistCard } from "@/components/site/artist-card";
import { EmptyState } from "@/components/site/empty-state";
import { NewsList } from "@/components/site/news-list";
import { Button } from "@/components/ui/button";
import { artists } from "@/content/artists";
import { news } from "@/content/news";
import { site } from "@/content/site";
import { t } from "@/i18n/config";
import { resolveLocale } from "@/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await resolveLocale(params);
  const tagline = t(site.tagline, locale);
  const intro = t(site.intro, locale);

  return (
    <>
      {/* Hero */}
      <section className="bg-grain relative flex min-h-[100svh] flex-col justify-end pt-32 pb-12 md:pb-16">
        <div className="container-editorial grid-editorial gap-y-10">
          <Reveal className="col-span-full flex items-center gap-4">
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="eyebrow">{dict.home.eyebrow}</span>
          </Reveal>
          <Reveal as="h1" delay={0.1} className="col-span-full text-display uppercase">
            Redstart
            <br />
            <span className="text-muted-foreground">ENM</span>
          </Reveal>
          <div className="col-span-full flex flex-col gap-10 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            <Reveal as="p" delay={0.2} className="max-w-[30rem] text-lead text-muted-foreground">
              {tagline || t(site.name, locale)}
            </Reveal>
            <Reveal delay={0.3} variant="fadeIn" className="eyebrow flex items-center gap-4">
              {dict.home.scroll}
              <span aria-hidden className="block h-px w-12 bg-border" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* About */}
      <Section tone="sunken">
        <SectionHeading
          index="01"
          eyebrow={dict.about.eyebrow}
          title={dict.about.title}
          description={intro || undefined}
          align="split"
        />
        <Reveal className="mt-14 grid-editorial">
          <div className="col-span-full lg:col-start-5">
            <Button asChild variant="link">
              <Link href={`/${locale}/about`}>
                {dict.home.aboutCta} <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Artists */}
      <Section>
        <SectionHeading index="02" eyebrow={dict.artists.eyebrow} title={dict.artists.title} align="split" />
        <div className="mt-20">
          {artists.length > 0 ? (
            <Stagger className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {artists.slice(0, 3).map((artist, i) => (
                <StaggerItem key={artist.slug}>
                  <ArtistCard artist={artist} locale={locale} priority={i === 0} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <EmptyState dict={dict} />
          )}
        </div>
        <Reveal className="mt-14">
          <Button asChild variant="link">
            <Link href={`/${locale}/artists`}>
              {dict.home.artistsCta} <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* News */}
      <Section tone="sunken">
        <SectionHeading index="03" eyebrow={dict.news.eyebrow} title={dict.news.title} align="split" />
        <div className="mt-20">
          {news.length > 0 ? <NewsList posts={news.slice(0, 4)} locale={locale} dict={dict} /> : <EmptyState dict={dict} />}
        </div>
        <Reveal className="mt-14">
          <Button asChild variant="link">
            <Link href={`/${locale}/news`}>
              {dict.home.newsCta} <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* Audition & Contact */}
      <Section>
        <div className="grid-editorial gap-y-10">
          <Reveal className="col-span-full flex items-center gap-4 lg:col-span-3">
            <span className="eyebrow text-foreground tabular-nums">04</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="eyebrow">{dict.contact.eyebrow}</span>
          </Reveal>
          <div className="col-span-full lg:col-span-8 lg:col-start-5">
            <Reveal as="h2" delay={0.08} className="text-headline">
              {dict.contact.title}
            </Reveal>
            <Reveal delay={0.16} className="mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/contact`}>
                  {dict.home.contactCta} <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
