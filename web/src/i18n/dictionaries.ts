import "server-only";

import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./config";
import { ko, type Dictionary } from "@/content/dictionaries/ko";
import { en } from "@/content/dictionaries/en";
import { ja } from "@/content/dictionaries/ja";

const DICTIONARIES: Record<Locale, Dictionary> = { ko, en, ja };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };

/** Resolves the [locale] route param for a page, or 404s on an unknown one. */
export async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, dict: getDictionary(locale) };
}
