"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function OrderConfirmation({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center grain"
    >
      <div className="w-10 h-px bg-stone mb-8" />
      <div className="font-display text-4xl md:text-5xl text-espresso max-w-xl leading-tight">
        {t("menu.confirmed")}
      </div>
      <button
        onClick={onBack}
        className="mt-10 text-sm tracking-widest uppercase text-stone hover:text-espresso transition"
      >
        ← {t("menu.back")}
      </button>
    </motion.div>
  );
}
