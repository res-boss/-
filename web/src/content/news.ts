import type { NewsPost } from "./types";

/** 뉴스 · 공지 — 날짜 최신순으로 자동 정렬됩니다. */
const posts: NewsPost[] = [];

export const news = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return news.find((p) => p.slug === slug);
}
