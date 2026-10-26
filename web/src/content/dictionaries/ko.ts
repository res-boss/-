/**
 * UI 문구 (메뉴, 버튼, 안내 문구). 회사 정보·아티스트·뉴스 같은 실제 콘텐츠는
 * src/content/site.ts · artists.ts · news.ts 에 있습니다.
 */
export const ko = {
  meta: {
    siteName: "레드스타트이엔엠",
    description: "레드스타트이엔엠 공식 홈페이지",
  },
  nav: {
    home: "Home",
    about: "About",
    artists: "Artists",
    news: "News",
    contact: "Audition & Contact",
    menu: "메뉴",
    close: "닫기",
    language: "언어 선택",
    skipToContent: "본문 바로가기",
  },
  home: {
    eyebrow: "Official Website",
    scroll: "Scroll",
    aboutCta: "회사 소개 보기",
    artistsCta: "전체 아티스트",
    newsCta: "전체 소식",
    contactCta: "오디션 · 문의하기",
  },
  about: {
    eyebrow: "About",
    title: "회사 소개",
    vision: "Vision",
    history: "History",
    message: "CEO Message",
  },
  artists: {
    eyebrow: "Artists",
    title: "아티스트",
    members: "Members",
    debut: "Debut",
    viewProfile: "프로필 보기",
    back: "아티스트 목록",
  },
  news: {
    eyebrow: "News",
    title: "뉴스 · 공지",
    all: "전체",
    notice: "공지",
    press: "보도자료",
    readMore: "자세히 보기",
    back: "목록으로",
  },
  contact: {
    eyebrow: "Audition & Contact",
    title: "오디션 · 문의",
    audition: "Audition",
    business: "Business Inquiry",
    location: "Location",
    email: "Email",
    phone: "Tel",
    address: "Address",
  },
  footer: {
    company: "상호",
    ceo: "대표",
    businessNumber: "사업자등록번호",
    address: "주소",
    privacy: "개인정보처리방침",
    rights: "All rights reserved.",
  },
  empty: {
    title: "콘텐츠 준비 중입니다",
    body: "곧 새로운 소식으로 찾아뵙겠습니다.",
  },
};

export type Dictionary = typeof ko;
