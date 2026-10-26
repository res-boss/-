import localFont from "next/font/local";
import { Inter_Tight } from "next/font/google";

/** 본문·UI — 한글/라틴 모두 고른 회색도를 가진 Pretendard Variable */
export const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
  preload: true,
});

/** 디스플레이 — 라틴 헤드라인 전용. Pretendard의 라틴 글리프(Inter 계열)와 자연스럽게 이어짐 */
export const displayLatin = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display-latin",
  weight: ["200", "300", "400", "500"],
  display: "swap",
});
