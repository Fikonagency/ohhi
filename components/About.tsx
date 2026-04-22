"use client";
import { useTranslation } from "react-i18next";
import Section from "./Section";

export default function About() {
  const { t } = useTranslation();
  return (
    <Section id="about">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-stone mb-6">{t("about.heading")}</div>
          <h2 className="font-display text-5xl md:text-6xl text-espresso leading-tight mb-8">{t("about.title")}</h2>
          <div className="rule max-w-[80px] mb-8" />
          <div className="space-y-6 text-charcoal text-lg leading-relaxed whitespace-pre-line">
            {t("about.body")}
          </div>
        </div>
        <div className="aspect-[4/5] bg-sand border border-stone/30 flex items-center justify-center">
          <span className="text-stone text-sm tracking-widest uppercase">[{t("about.photo")}]</span>
        </div>
      </div>
    </Section>
  );
}
