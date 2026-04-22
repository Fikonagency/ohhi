"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import sv from "@/locales/sv.json";

if (!i18n.isInitialized) {
  const stored = typeof window !== "undefined" ? localStorage.getItem("ohhi_lang") : null;
  i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, sv: { translation: sv } },
    lng: stored || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export function setLang(lang: "en" | "sv") {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem("ohhi_lang", lang);
}

export default i18n;
