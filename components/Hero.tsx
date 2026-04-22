"use client";
import Link from "next/link";
import Image from "next/image";
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
        <div className="text-[10px] tracking-[0.3em] uppercase text-brand mb-8">
          <span className="inline-block border border-brand/40 px-3 py-1">{t("hero.opening")}</span>
        </div>
        <div className="relative w-[min(80vw,520px)] aspect-square mx-auto">
          <Image
            src="/bilder/logo.png"
            alt="Ohhi — Oh, Hi!"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 520px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-10 h-px bg-brand/40 mx-auto my-8" />
        <p className="text-sm md:text-base tracking-wide text-brand">Malmö — Beijerskajen 2</p>
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
            className="px-8 py-3 bg-brand-deep text-offwhite text-sm tracking-widest uppercase hover:bg-brand-dark transition"
          >
            {t("hero.orderCta")} →
          </Link>
          <Link
            href="/menu"
            className="px-8 py-3 border border-brand-deep text-brand-deep text-sm tracking-widest uppercase hover:bg-brand-deep hover:text-offwhite transition"
          >
            {t("hero.menuCta")} →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
