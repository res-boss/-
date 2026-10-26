import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/** Top of every inner page: eyebrow + large title, with room for the fixed header. */
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="bg-grain pt-40 pb-20 md:pt-52 md:pb-28">
      <Container>
        <div className="grid-editorial gap-y-8">
          <Reveal className="col-span-full flex items-center gap-4">
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal as="h1" delay={0.08} className="col-span-full text-headline lg:col-span-10">
            {title}
          </Reveal>
          {children && (
            <Reveal delay={0.16} className="col-span-full max-w-[38rem] text-lead text-muted-foreground lg:col-span-6 lg:col-start-7">
              {children}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
