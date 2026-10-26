import Image from "next/image";
import Link from "next/link";

import type { Artist } from "@/content/types";
import { t, type Locale } from "@/i18n/config";

export function ArtistCard({ artist, locale, priority }: { artist: Artist; locale: Locale; priority?: boolean }) {
  return (
    <Link href={`/${locale}/artists/${artist.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-sunken">
        {artist.image && (
          <Image
            src={artist.image}
            alt={t(artist.name, locale)}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale-[35%] transition-[transform,filter] duration-[1.6s] ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        )}
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-title font-light">{t(artist.name, locale)}</h3>
        <span className="eyebrow shrink-0">{t(artist.category, locale)}</span>
      </div>
    </Link>
  );
}
