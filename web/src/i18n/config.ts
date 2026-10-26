export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
  ja: "JA",
};

/** `lang` attribute / Open Graph locale for each route. */
export const HTML_LANG: Record<Locale, string> = { ko: "ko", en: "en", ja: "ja" };
export const OG_LOCALE: Record<Locale, string> = { ko: "ko_KR", en: "en_US", ja: "ja_JP" };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Text that exists in every site language. */
export type Localized<T = string> = Record<Locale, T>;

/** Picks the requested language, falling back to Korean when a translation is missing. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] || value[DEFAULT_LOCALE];
}
