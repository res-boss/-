import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/** Shown wherever content hasn't been handed over yet. */
export function EmptyState({ dict }: { dict: Dictionary }) {
  return (
    <Reveal className="flex flex-col items-center border-y border-hairline py-24 text-center md:py-32">
      <span aria-hidden className="mb-8 h-10 w-px bg-border" />
      <p className="font-display text-title font-light">{dict.empty.title}</p>
      <p className="mt-4 text-caption text-muted-foreground">{dict.empty.body}</p>
    </Reveal>
  );
}
