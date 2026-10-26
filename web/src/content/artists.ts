import type { Artist } from "./types";

/** 소속 아티스트 — 배열 순서대로 사이트에 노출됩니다. */
export const artists: Artist[] = [];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}
