import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

/*
 * Step 1 — Design system preview.
 * This page is replaced by the real main page sections in step 2.
 */

const PALETTE = [
  { name: "Ink 950", token: "ink-950", hex: "#141312", note: "Modern black", dark: true },
  { name: "Ink 800", token: "ink-800", hex: "#262523", note: "Deep dark gray", dark: true },
  { name: "Ink 600", token: "ink-600", hex: "#4A4743", note: "Charcoal", dark: true },
  { name: "Stone 400", token: "stone-400", hex: "#969086", note: "Subtle text", dark: true },
  { name: "Sand 300", token: "sand-300", hex: "#CFC5B4", note: "Soft beige" },
  { name: "Oat 100", token: "oat-100", hex: "#EBE5DA", note: "Oatmeal" },
  { name: "Oat 50", token: "oat-50", hex: "#F3EFE8", note: "Card" },
  { name: "Paper", token: "paper", hex: "#F8F6F1", note: "Warm white" },
];

const TYPE_SCALE = [
  { token: "text-display", spec: "48 → 136px · 0.98 · −3%", sample: "Quiet Form" },
  { token: "text-headline", spec: "36 → 72px · 1.08 · −2%", sample: "덜어낼수록 선명해지는 것들" },
  { token: "text-title", spec: "24 → 36px · 1.25 · −1%", sample: "Material, light, and time" },
  { token: "text-lead", spec: "17 → 22px · 1.75 · +0.5%", sample: "형태는 조용히, 재료는 정직하게. 오래 곁에 두고 싶은 사물을 만듭니다." },
  { token: "text-body", spec: "16px · 1.85 · +1%", sample: "넉넉한 행간과 자간은 문장 사이에 숨을 불어넣습니다. 읽는 속도가 느려질수록 내용은 더 깊이 남습니다." },
  { token: "text-caption", spec: "13px · 1.7 · +2%", sample: "Oak, linen and hand-thrown stoneware — Seoul, 2026" },
  { token: "eyebrow", spec: "11px · uppercase · +28%", sample: "Collection 04" },
];

export default function DesignSystemPage() {
  return (
    <main>
      {/* Intro */}
      <Section className="bg-grain pt-32 md:pt-44">
        <div className="grid-editorial gap-y-10">
          <Reveal className="col-span-full flex items-center gap-4">
            <span className="eyebrow text-foreground">00</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="eyebrow">Design System</span>
          </Reveal>
          <Reveal as="h1" delay={0.1} className="col-span-full text-display lg:col-span-10">
            Quiet by design.
          </Reveal>
          <Reveal as="p" delay={0.2} className="col-span-full text-lead text-muted-foreground md:col-span-6 lg:col-start-7 lg:col-span-5">
            뮤트 톤의 톤온톤 팔레트, 넓은 행간과 자간, 느리고 부드러운 모션. 모든 요소가 같은 호흡으로 움직이도록 설계된 토큰입니다.
          </Reveal>
        </div>
      </Section>

      {/* Color */}
      <Section tone="sunken">
        <SectionHeading index="01" eyebrow="Color" title="Muted, warm, tone-on-tone." align="split" />
        <Stagger className="mt-20 grid grid-cols-2 gap-px bg-hairline md:grid-cols-4" stagger={0.06}>
          {PALETTE.map((c) => (
            <StaggerItem key={c.token} className="bg-sunken">
              <div
                className="flex aspect-[4/5] flex-col justify-end p-5 md:p-6"
                style={{ backgroundColor: c.hex, color: c.dark ? "#EBE5DA" : "#262523" }}
              >
                <p className="text-caption font-medium">{c.name}</p>
                <p className="text-caption opacity-60">
                  {c.hex} · {c.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Typography */}
      <Section>
        <SectionHeading
          index="02"
          eyebrow="Typography"
          title="Pretendard & Inter Tight."
          description="한글은 Pretendard Variable, 라틴 헤드라인은 Inter Tight Light. 큰 제목은 자간을 조이고, 본문과 레이블은 넓게 엽니다."
          align="split"
        />
        <Stagger className="mt-20">
          {TYPE_SCALE.map((t) => (
            <StaggerItem key={t.token} className="grid-editorial gap-y-3 border-t border-border py-10 md:py-12">
              <div className="col-span-full lg:col-span-3">
                <p className="text-caption font-medium">{t.token}</p>
                <p className="text-caption text-muted-foreground">{t.spec}</p>
              </div>
              <p className={`col-span-full lg:col-span-9 ${t.token} ${t.token.startsWith("text-d") || t.token.startsWith("text-h") || t.token === "text-title" ? "font-display font-light" : ""}`}>
                {t.sample}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Components */}
      <Section tone="sunken">
        <SectionHeading index="03" eyebrow="Components" title="Refined, never loud." align="split" />
        <div className="mt-20 grid-editorial gap-y-16">
          <Reveal className="col-span-full space-y-8 md:col-span-4 lg:col-span-6">
            <p className="eyebrow">Buttons</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Explore</Button>
              <Button variant="outline">
                Visit Studio <ArrowUpRight />
              </Button>
              <Button variant="secondary" shape="pill">
                Book
              </Button>
              <Button variant="link">Read the story</Button>
            </div>
            <p className="eyebrow pt-6">Badges</p>
            <div className="flex flex-wrap gap-3">
              <Badge>New</Badge>
              <Badge variant="outline">Limited</Badge>
              <Badge variant="inverse">Archive</Badge>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="col-span-full space-y-8 md:col-span-4 lg:col-span-5 lg:col-start-8">
            <p className="eyebrow">Newsletter field</p>
            <form className="flex items-end gap-4">
              <label className="sr-only" htmlFor="ds-email">
                Email
              </label>
              <Input id="ds-email" type="email" placeholder="your@email.com" />
              <Button variant="link" type="button">
                Subscribe
              </Button>
            </form>
            <Separator />
            <p className="text-caption text-muted-foreground">
              입력 필드는 밑줄만 남긴 인쇄물 양식처럼. 포커스 시 선이 짙어지는 것 외의 장식은 두지 않습니다.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Motion */}
      <Section tone="inverse">
        <div className="grid-editorial gap-y-10">
          <Reveal className="col-span-full flex items-center gap-4 lg:col-span-3">
            <span className="eyebrow text-inverse-foreground">04</span>
            <span aria-hidden className="h-px w-8 bg-inverse-foreground/20" />
            <span className="eyebrow text-inverse-foreground/60">Motion</span>
          </Reveal>
          <Reveal as="h2" delay={0.08} className="col-span-full text-headline lg:col-span-8 lg:col-start-5">
            1.0s · cubic-bezier(.22, 1, .36, 1) · 24px rise.
          </Reveal>
          <Reveal as="p" delay={0.16} className="col-span-full max-w-[34rem] text-lead text-inverse-foreground/60 lg:col-span-6 lg:col-start-5">
            모든 요소는 뷰포트에 15% 들어왔을 때 단 한 번, 24px 아래에서 천천히 떠오릅니다. 동작 줄이기 설정 사용자에게는 움직임 없이 페이드만 적용합니다.
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
