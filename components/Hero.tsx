"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="grain relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <div className="text-[10px] tracking-[0.3em] uppercase text-stone mb-6">
          <span className="inline-block border border-sand px-3 py-1">{t("hero.opening")}</span>
        </div>
        <h1 className="font-display text-espresso leading-none tracking-tight text-[22vw] md:text-[18vw] lg:text-[220px]">
          OHHI
        </h1>
        <div className="w-10 h-px bg-stone mx-auto my-6" />
        <p className="text-sm md:text-base tracking-wide text-stone">Malmö — Beijerskajen 2</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-lg md:text-xl text-charcoal mb-8">{t("hero.tagline")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/menu"
            className="px-8 py-3 bg-espresso text-cream text-sm tracking-widest uppercase hover:bg-charcoal transition"
          >
            {t("hero.orderCta")} →
          </Link>
          <Link
            href="/menu"
            className="px-8 py-3 border border-espresso text-espresso text-sm tracking-widest uppercase hover:bg-espresso hover:text-cream transition"
          >
            {t("hero.menuCta")} →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
