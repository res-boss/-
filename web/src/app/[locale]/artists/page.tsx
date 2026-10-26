import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArtistCard } from "@/components/site/artist-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageIntro } from "@/components/site/page-intro";
import { artists } from "@/content/artists";
import { resolveLocale } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dict } = await resolveLocale(params);
  return { title: dict.artists.title };
}

export default async function ArtistsPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);

  return (
    <>
      <PageIntro eyebrow={dict.artists.eyebrow} title={dict.artists.title} />
      <Section className="pt-0 md:pt-0">
        {artists.length > 0 ? (
          <Stagger className="grid gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist, i) => (
              <StaggerItem key={artist.slug}>
                <ArtistCard artist={artist} locale={locale} priority={i < 3} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <EmptyState dict={dict} />
        )}
      </Section>
    </>
  );
}
