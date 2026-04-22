"use client";
import { useTranslation } from "react-i18next";
import Section from "./Section";

// TODO: Hook up to Instagram Basic Display API or use Elfsight embed.
export default function InstagramFeed() {
  const { t } = useTranslation();
  return (
    <Section>
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-3xl md:text-4xl text-espresso">{t("instagram.heading")}</h2>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-stone hover:text-espresso transition">
          {t("instagram.follow")} →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-stone/80 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="#F5F0E8" />
            </svg>
          </div>
        ))}
      </div>
    </Section>
  );
}
