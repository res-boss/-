import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EmptyState } from "@/components/site/empty-state";
import { PageIntro } from "@/components/site/page-intro";
import { site } from "@/content/site";
import { t } from "@/i18n/config";
import { resolveLocale } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dict } = await resolveLocale(params);
  return { title: dict.about.title };
}

function TextBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid-editorial gap-y-6 border-t border-border pt-10">
      <Reveal className="eyebrow col-span-full lg:col-span-3">{label}</Reveal>
      <Reveal delay={0.08} className="col-span-full whitespace-pre-line text-lead lg:col-span-7 lg:col-start-5">
        {body}
      </Reveal>
    </div>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);
  const vision = t(site.vision, locale);
  const message = t(site.ceoMessage, locale);
  const hasContent = vision || message || site.history.length > 0;

  return (
    <>
      <PageIntro eyebrow={dict.about.eyebrow} title={t(site.name, locale)}>
        {t(site.intro, locale) || null}
      </PageIntro>

      <Section className="pt-0 md:pt-0">
        {!hasContent && <EmptyState dict={dict} />}
        <div className="space-y-24 md:space-y-32">
          {vision && <TextBlock label={dict.about.vision} body={vision} />}
          {message && <TextBlock label={dict.about.message} body={message} />}

          {site.history.length > 0 && (
            <div className="grid-editorial gap-y-6 border-t border-border pt-10">
              <Reveal className="eyebrow col-span-full lg:col-span-3">{dict.about.history}</Reveal>
              <Stagger as="ol" className="col-span-full lg:col-span-7 lg:col-start-5">
                {site.history.map((h) => (
                  <StaggerItem as="li" key={h.year} className="grid grid-cols-[5rem_1fr] gap-6 border-b border-hairline py-6 md:grid-cols-[8rem_1fr]">
                    <span className="font-display text-title font-light tabular-nums">{h.year}</span>
                    <ul className="space-y-2 pt-2 text-body text-muted-foreground">
                      {t(h.items, locale).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
