"use client";
import { useTranslation } from "react-i18next";
import Section from "./Section";

const slots = [
  { label: "Photo: latte art", ratio: "aspect-[4/5]" },
  { label: "Photo: exterior", ratio: "aspect-[3/4]" },
  { label: "Photo: pastries", ratio: "aspect-square" },
  { label: "Video: behind the bar", ratio: "aspect-[4/5]" },
  { label: "Photo: interior detail", ratio: "aspect-[3/4]" },
  { label: "Photo: coffee pour", ratio: "aspect-square" },
];

export default function Gallery() {
  const { t } = useTranslation();
  // Replace placeholder divs with real <img /> or <video /> elements.
  return (
    <Section>
      <div className="text-xs tracking-[0.3em] uppercase text-stone mb-6">02</div>
      <h2 className="font-display text-5xl md:text-6xl text-espresso mb-12">{t("gallery.heading")}</h2>
      <div className="md:grid md:grid-cols-3 gap-4 md:gap-6 flex overflow-x-auto snap-x -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
        {slots.map((s, i) => (
          <div
            key={i}
            className={`${s.ratio} bg-sand border border-stone/30 flex items-center justify-center flex-shrink-0 w-[80vw] md:w-auto snap-center`}
          >
            <span className="text-stone text-xs tracking-widest uppercase">[{s.label}]</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
