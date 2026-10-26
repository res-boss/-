import type { SiteInfo } from "./types";

/**
 * 회사 기본 정보 — 운영대행사에서 자료를 받으면 이 파일의 빈 칸("")만 채우면 됩니다.
 * 빈 칸인 항목은 사이트에 표시되지 않습니다.
 */
export const site: SiteInfo = {
  name: { ko: "레드스타트이엔엠", en: "Redstart ENM", ja: "Redstart ENM" },
  tagline: { ko: "", en: "", ja: "" },
  intro: { ko: "", en: "", ja: "" },
  vision: { ko: "", en: "", ja: "" },
  ceoMessage: { ko: "", en: "", ja: "" },
  history: [],
  contact: {
    email: "",
    auditionEmail: "",
    phone: "",
    address: { ko: "", en: "", ja: "" },
    mapUrl: "",
  },
  audition: { ko: "", en: "", ja: "" },
  legal: {
    companyName: { ko: "", en: "", ja: "" },
    ceo: { ko: "", en: "", ja: "" },
    businessNumber: "",
    address: { ko: "", en: "", ja: "" },
  },
  socials: [],
};
