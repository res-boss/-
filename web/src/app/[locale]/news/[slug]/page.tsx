import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getPost, news } from "@/content/news";
import { LOCALES, t } from "@/i18n/config";
import { resolveLocale } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => news.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await resolveLocale(params);
  const post = getPost((await params).slug);
  return post ? { title: t(post.title, locale), description: t(post.excerpt, locale) } : {};
}

export default async function NewsPostPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="pt-40 pb-section md:pt-52">
      <Container>
        <header className="mx-auto max-w-[48rem]">
          <Reveal className="flex items-center gap-4">
            <time dateTime={post.date} className="eyebrow tabular-nums text-foreground">
              {post.date.replaceAll("-", ".")}
            </time>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="eyebrow">{dict.news[post.category]}</span>
          </Reveal>
          <Reveal as="h1" delay={0.08} className="mt-8 text-headline">
            {t(post.title, locale)}
          </Reveal>
        </header>

        {post.image && (
          <Reveal variant="unveil" className="relative mx-auto mt-16 aspect-[16/9] max-w-[64rem] overflow-hidden bg-sunken">
            <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </Reveal>
        )}

        <Reveal delay={0.12} className="prose prose-editorial mx-auto mt-16 whitespace-pre-line">
          {t(post.body, locale)}
        </Reveal>

        <div className="mx-auto mt-20 max-w-[48rem] border-t border-border pt-8">
          <Button asChild variant="link">
            <Link href={`/${locale}/news`}>
              <ArrowLeft /> {dict.news.back}
            </Link>
          </Button>
        </div>
      </Container>
    </article>
  );
}
