"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Section from "./Section";

// TODO: Hook up to Instagram Basic Display API or Elfsight embed for live feed.
const posts = [
  "/bilder/p664.webp",
  "/bilder/p465.webp",
  "/bilder/bunny.webp",
  "/bilder/p9484.jpg",
  "/bilder/p9663.jpg",
  "/bilder/p6315.jpg",
];

export default function InstagramFeed() {
  const { t } = useTranslation();
  return (
    <Section>
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-3xl md:text-4xl text-brand-deep">{t("instagram.heading")}</h2>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-brand hover:text-brand-deep transition">
          {t("instagram.follow")} →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
        {posts.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden">
            <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 16vw" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </Section>
  );
}
