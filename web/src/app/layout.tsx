import type { Metadata, Viewport } from "next";

import { MotionProvider } from "@/components/motion/motion-provider";
import { displayLatin, pretendard } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atelier — Quiet objects for considered living",
    template: "%s — Atelier",
  },
  description: "절제된 형태와 재료로 일상의 밀도를 높이는 디자인 스튜디오.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#141312" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={cn(pretendard.variable, displayLatin.variable)} suppressHydrationWarning>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
