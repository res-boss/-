import * as React from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "split";
  className?: string;
};

/**
 * Editorial section opener: "01 — Eyebrow" label, a light headline,
 * and optional description. `split` puts the copy in the right columns on desktop.
 */
export function SectionHeading({ index, eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("grid-editorial gap-y-8", className)}>
      <Reveal className={cn("col-span-full flex items-center gap-4", align === "split" && "lg:col-span-3")}>
        {index && <span className="eyebrow text-foreground tabular-nums">{index}</span>}
        {index && <span aria-hidden className="h-px w-8 bg-border" />}
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <div className={cn("col-span-full", align === "split" ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-9")}>
        <Reveal as="h2" delay={0.08} className="text-headline">
          {title}
        </Reveal>
        {description && (
          <Reveal as="p" delay={0.16} className="mt-8 max-w-[34rem] text-lead text-muted-foreground">
            {description}
          </Reveal>
        )}
      </div>
    </div>
  );
}
