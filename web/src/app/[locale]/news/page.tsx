import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/site/empty-state";
import { NewsList } from "@/components/site/news-list";
import { PageIntro } from "@/components/site/page-intro";
import { news } from "@/content/news";
import { resolveLocale } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dict } = await resolveLocale(params);
  return { title: dict.news.title };
}

export default async function NewsPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);

  return (
    <>
      <PageIntro eyebrow={dict.news.eyebrow} title={dict.news.title} />
      <Section className="pt-0 md:pt-0">
        {news.length > 0 ? <NewsList posts={news} locale={locale} dict={dict} /> : <EmptyState dict={dict} />}
      </Section>
    </>
  );
}
