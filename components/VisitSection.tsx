"use client";
import { useTranslation } from "react-i18next";
import Section from "./Section";

export default function VisitSection() {
  const { t } = useTranslation();
  return (
    <Section id="visit">
      <div className="text-xs tracking-[0.3em] uppercase text-stone mb-6">03</div>
      <h2 className="font-display text-5xl md:text-6xl text-espresso mb-12">{t("visit.heading")}</h2>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div className="space-y-6">
          <div>
            <div className="font-display text-2xl text-espresso">Ohhi</div>
            <div className="text-charcoal mt-1">Beijerskajen 2</div>
            <div className="text-charcoal">211 19 Malmö</div>
          </div>
          <div className="rule max-w-[80px]" />
          <div>
            <div className="text-xs tracking-widest uppercase text-stone mb-2">{t("visit.opening")}</div>
          </div>
          <div>
            <div className="text-xs tracking-widest uppercase text-stone mb-2">{t("visit.hours")}</div>
            <div className="text-charcoal">{t("visit.weekdays")}</div>
            <div className="text-charcoal">{t("visit.weekends")}</div>
          </div>
          <div className="rule max-w-[80px]" />
          <div>
            <a href="mailto:hello@ohhi.se" className="text-espresso underline underline-offset-4 decoration-sand hover:decoration-espresso">
              hello@ohhi.se
            </a>
          </div>
        </div>
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] border border-stone/30 overflow-hidden">
          {/* TODO: Replace src with real Google Maps embed URL for Beijerskajen 2. */}
          <iframe
            title="Ohhi on Google Maps"
            src="https://www.google.com/maps?q=Beijerskajen+2,+Malmö&output=embed"
            className="w-full h-full"
            style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}
