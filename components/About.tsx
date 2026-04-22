"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Section from "./Section";

export default function About() {
  const { t } = useTranslation();
  return (
    <Section id="about">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-brand mb-6">{t("about.heading")}</div>
          <h2 className="font-display text-5xl md:text-6xl text-brand-deep leading-tight mb-8">{t("about.title")}</h2>
          <div className="rule max-w-[80px] mb-8" />
          <div className="space-y-6 text-charcoal text-lg leading-relaxed whitespace-pre-line">
            {t("about.body")}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/bilder/window.webp"
            alt="Ohhi interior"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </Section>
  );
}
