import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { artists, getArtist } from "@/content/artists";
import { LOCALES, t } from "@/i18n/config";
import { resolveLocale } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => artists.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await resolveLocale(params);
  const artist = getArtist((await params).slug);
  return artist ? { title: t(artist.name, locale) } : {};
}

export default async function ArtistPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);
  const artist = getArtist((await params).slug);
  if (!artist) notFound();

  return (
    <article className="pt-32 pb-section md:pt-40">
      <Container>
        <div className="grid-editorial gap-y-14">
          <Reveal variant="unveil" className="relative col-span-full aspect-[3/4] overflow-hidden bg-sunken md:col-span-4 lg:col-span-6">
            {artist.image && (
              <Image src={artist.image} alt={t(artist.name, locale)} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            )}
          </Reveal>

          <div className="col-span-full md:col-span-4 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <Reveal className="eyebrow">{t(artist.category, locale)}</Reveal>
            <Reveal as="h1" delay={0.08} className="mt-6 text-headline">
              {t(artist.name, locale)}
            </Reveal>
            {t(artist.bio, locale) && (
              <Reveal as="p" delay={0.16} className="mt-10 whitespace-pre-line text-body text-muted-foreground">
                {t(artist.bio, locale)}
              </Reveal>
            )}

            <dl className="mt-14 border-t border-border">
              {artist.debut && (
                <div className="flex justify-between border-b border-hairline py-4 text-caption">
                  <dt className="text-muted-foreground">{dict.artists.debut}</dt>
                  <dd>{artist.debut}</dd>
                </div>
              )}
            </dl>

            {artist.members.length > 0 && (
              <div className="mt-14">
                <p className="eyebrow">{dict.artists.members}</p>
                <Stagger as="ul" className="mt-6">
                  {artist.members.map((m) => (
                    <StaggerItem as="li" key={t(m.name, "en")} className="flex justify-between border-b border-hairline py-4">
                      <span className="text-body">{t(m.name, locale)}</span>
                      {m.position && <span className="text-caption text-muted-foreground">{t(m.position, locale)}</span>}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}

            {artist.socials.length > 0 && (
              <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
                {artist.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="link-underline eyebrow text-foreground">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <Button asChild variant="link" className="mt-16">
              <Link href={`/${locale}/artists`}>
                <ArrowLeft /> {dict.artists.back}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
