import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { EmptyState } from "@/components/site/empty-state";
import { PageIntro } from "@/components/site/page-intro";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { t } from "@/i18n/config";
import { resolveLocale } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dict } = await resolveLocale(params);
  return { title: dict.contact.title };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid-editorial gap-y-6 border-t border-border pt-10">
      <Reveal className="eyebrow col-span-full lg:col-span-3">{label}</Reveal>
      <Reveal delay={0.08} className="col-span-full lg:col-span-7 lg:col-start-5">
        {children}
      </Reveal>
    </div>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-hairline py-5 sm:flex-row sm:justify-between sm:gap-8">
      <dt className="text-caption text-muted-foreground">{label}</dt>
      <dd className="text-body">
        {href ? (
          <a href={href} className="link-underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);
  const { contact } = site;
  const audition = t(site.audition, locale);
  const address = t(contact.address, locale);
  const hasBusiness = contact.email || contact.phone;
  const hasContent = audition || contact.auditionEmail || hasBusiness || address;

  return (
    <>
      <PageIntro eyebrow={dict.contact.eyebrow} title={dict.contact.title} />
      <Section className="pt-0 md:pt-0">
        {!hasContent && <EmptyState dict={dict} />}
        <div className="space-y-24 md:space-y-32">
          {(audition || contact.auditionEmail) && (
            <Block label={dict.contact.audition}>
              {audition && <p className="whitespace-pre-line text-lead">{audition}</p>}
              {contact.auditionEmail && (
                <dl className="mt-10 border-t border-border">
                  <Row label={dict.contact.email} value={contact.auditionEmail} href={`mailto:${contact.auditionEmail}`} />
                </dl>
              )}
            </Block>
          )}

          {hasBusiness && (
            <Block label={dict.contact.business}>
              <dl className="border-t border-border">
                {contact.email && <Row label={dict.contact.email} value={contact.email} href={`mailto:${contact.email}`} />}
                {contact.phone && <Row label={dict.contact.phone} value={contact.phone} href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} />}
              </dl>
            </Block>
          )}

          {address && (
            <Block label={dict.contact.location}>
              <p className="text-lead">{address}</p>
              {contact.mapUrl && (
                <Button asChild variant="link" className="mt-8">
                  <a href={contact.mapUrl} target="_blank" rel="noreferrer">
                    Map <ArrowUpRight />
                  </a>
                </Button>
              )}
            </Block>
          )}
        </div>
      </Section>
    </>
  );
}
