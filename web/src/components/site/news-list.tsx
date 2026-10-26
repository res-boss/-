import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { NewsPost } from "@/content/types";
import { t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function NewsList({ posts, locale, dict }: { posts: NewsPost[]; locale: Locale; dict: Dictionary }) {
  return (
    <Stagger as="ul" className="border-t border-border">
      {posts.map((post) => (
        <StaggerItem as="li" key={post.slug} className="border-b border-border">
          <Link href={`/${locale}/news/${post.slug}`} className="group grid-editorial items-baseline gap-y-3 py-8 md:py-10">
            <time dateTime={post.date} className="col-span-2 text-caption tabular-nums text-muted-foreground md:col-span-2">
              {post.date.replaceAll("-", ".")}
            </time>
            <span className="eyebrow col-span-2 md:col-span-2">{dict.news[post.category]}</span>
            <h3 className="col-span-full text-lead transition-colors duration-500 group-hover:text-muted-foreground md:col-span-3 lg:col-span-7">
              {t(post.title, locale)}
            </h3>
            <ArrowUpRight
              aria-hidden
              className="hidden size-4 justify-self-end stroke-[1.25] text-subtle transition-transform duration-700 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 md:col-span-1 md:block"
            />
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
