import type { Localized } from "@/i18n/config";

export type SocialLink = {
  label: string; // "Instagram", "YouTube", "X" …
  href: string;
};

export type HistoryItem = {
  year: string;
  items: Localized<string[]>;
};

export type SiteInfo = {
  name: Localized;
  /** Short line under the company name on the home hero. Leave empty to hide. */
  tagline: Localized;
  intro: Localized;
  vision: Localized;
  ceoMessage: Localized;
  history: HistoryItem[];
  contact: {
    email: string;
    auditionEmail: string;
    phone: string;
    address: Localized;
    mapUrl: string;
  };
  audition: Localized;
  legal: {
    companyName: Localized;
    ceo: Localized;
    businessNumber: string;
    address: Localized;
  };
  socials: SocialLink[];
};

export type Artist = {
  slug: string;
  name: Localized;
  /** e.g. "Boy Group", "Solo" */
  category: Localized;
  debut: string;
  bio: Localized;
  members: { name: Localized; position?: Localized }[];
  /** Path under /public, e.g. "/images/artists/tiot/main.jpg" */
  image: string;
  socials: SocialLink[];
};

export type NewsCategory = "notice" | "press";

export type NewsPost = {
  slug: string;
  category: NewsCategory;
  date: string; // YYYY-MM-DD
  title: Localized;
  excerpt: Localized;
  body: Localized;
  image?: string;
};
