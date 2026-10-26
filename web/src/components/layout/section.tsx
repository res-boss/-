import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "default" | "sunken" | "inverse";
  /** Drop the default vertical padding (e.g. for full-bleed imagery). */
  flush?: boolean;
  containerClassName?: string;
};

const TONES = {
  default: "bg-background text-foreground",
  sunken: "bg-sunken text-foreground",
  inverse: "bg-inverse text-inverse-foreground",
} as const;

export function Section({ tone = "default", flush, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(TONES[tone], !flush && "py-section", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
