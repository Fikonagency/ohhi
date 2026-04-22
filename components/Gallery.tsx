"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Section from "./Section";

const slots = [
  { src: "/bilder/latte.webp", alt: "Latte art", ratio: "aspect-[4/5]" },
  { src: "/bilder/table.webp", alt: "Table setting", ratio: "aspect-[3/4]" },
  { src: "/bilder/p555.webp", alt: "Pastries", ratio: "aspect-square" },
  { src: "/bilder/coffee-cup.jpg", alt: "Coffee cup", ratio: "aspect-[4/5]" },
  { src: "/bilder/p6632.webp", alt: "Interior detail", ratio: "aspect-[3/4]" },
  { src: "/bilder/p156.webp", alt: "Coffee pour", ratio: "aspect-square" },
];

export default function Gallery() {
  const { t } = useTranslation();
  return (
    <Section>
      <div className="text-xs tracking-[0.3em] uppercase text-brand mb-6">02</div>
      <h2 className="font-display text-5xl md:text-6xl text-brand-deep mb-12">{t("gallery.heading")}</h2>
      <div className="md:grid md:grid-cols-3 gap-4 md:gap-6 flex overflow-x-auto snap-x -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
        {slots.map((s, i) => (
          <div
            key={i}
            className={`relative ${s.ratio} flex-shrink-0 w-[80vw] md:w-auto snap-center overflow-hidden`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
