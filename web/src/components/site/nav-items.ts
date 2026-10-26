import type { Dictionary } from "@/i18n/dictionaries";

export const NAV_KEYS = ["about", "artists", "news", "contact"] as const;

export function navItems(dict: Dictionary, locale: string) {
  return NAV_KEYS.map((key) => ({ key, href: `/${locale}/${key}`, label: dict.nav[key] }));
}
