import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";
import { configEN, AppConfig } from "./config";
import { configVI } from "./config.vi";

export type Lang = "vi" | "en";

// UI labels (hardcoded text in components) for both languages
export const ui = {
  vi: {
    nav: { about: "VỀ TÔI", work: "DỰ ÁN", contact: "LIÊN HỆ" },
    hero: { greeting: "Xin chào! Tôi là", intro: "Là một" },
    loading: { choose: "Chọn ngôn ngữ", loading: "Đang tải", enter: "BẮT ĐẦU" },
    whatido: { skills: "Kỹ năng & công cụ", detail: "Bấm để xem chi tiết" },
    career: { h1: "Hành trình", h2: "kinh nghiệm", present: "HIỆN TẠI" },
    work: {
      h1: "Dự án",
      h2: "của tôi",
      highlights: "Công nghệ & tính năng",
      watch: "Xem video",
      more: "Muốn xem thêm?",
      moreDesc: "Khám phá tất cả dự án và sản phẩm của tôi",
      viewAll: "Xem tất cả dự án →",
    },
    video: {
      heading: "Video của tôi",
      sub: "Một vài thước phim tôi đã thực hiện",
      unmute: "Bật tiếng",
      mute: "Tắt tiếng",
    },
    contact: {
      email: "Email",
      phone: "Điện thoại",
      location: "Địa điểm",
      social: "Mạng xã hội",
      footer1: "Thiết kế và phát triển",
      footer2: "bởi",
    },
    cta: { play: "Chơi cùng tôi", hire: "Hợp tác ngay" },
    myworks: {
      back: "← Quay lại trang chủ",
      allTitle: "Tất cả",
      allTitleHl: "Dự án",
      allDesc: "Tổng hợp toàn bộ dự án và sản phẩm tôi đã thực hiện",
      watch: "Xem video",
    },
  },
  en: {
    nav: { about: "ABOUT", work: "WORK", contact: "CONTACT" },
    hero: { greeting: "Hello! I'm", intro: "I'm a" },
    loading: { choose: "Choose language", loading: "Loading", enter: "ENTER" },
    whatido: { skills: "Skills & tools", detail: "Tap to see details" },
    career: { h1: "Journey", h2: "experience", present: "PRESENT" },
    work: {
      h1: "My",
      h2: "work",
      highlights: "Highlights",
      watch: "Watch video",
      more: "Want to see more?",
      moreDesc: "Explore all my projects and work",
      viewAll: "View all projects →",
    },
    video: {
      heading: "My Videos",
      sub: "A few films I've made",
      unmute: "Unmute",
      mute: "Mute",
    },
    contact: {
      email: "Email",
      phone: "Phone",
      location: "Location",
      social: "Social",
      footer1: "Designed & developed",
      footer2: "by",
    },
    cta: { play: "Play with me", hire: "Let's collaborate" },
    myworks: {
      back: "← Back to home",
      allTitle: "All",
      allTitleHl: "Projects",
      allDesc: "A complete collection of the projects and work I've done",
      watch: "Watch video",
    },
  },
};

export type UI = typeof ui.en;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  config: AppConfig;
  t: UI;
}

const I18nContext = createContext<I18nValue | null>(null);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "vi" || saved === "en") return saved;
    } catch {
      /* ignore */
    }
    return "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
    try {
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  }, []);

  const config = lang === "vi" ? configVI : configEN;
  const t = ui[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, config, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};
