"use client";
import { useTranslation } from "react-i18next";
import { setLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("sv") ? "sv" : "en";
  return (
    <div className={`text-xs tracking-widest uppercase flex items-center gap-2 ${className}`}>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-espresso" : "text-stone hover:text-charcoal transition"}
      >
        <AnimatePresence mode="wait"><motion.span key="en" initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}>EN</motion.span></AnimatePresence>
      </button>
      <span className="text-sand">/</span>
      <button
        onClick={() => setLang("sv")}
        className={lang === "sv" ? "text-espresso" : "text-stone hover:text-charcoal transition"}
      >
        SV
      </button>
    </div>
  );
}
