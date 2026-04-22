"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(245,240,232,0.95)" : "rgba(245,240,232,0)",
          borderBottomColor: scrolled ? "#D4C4A8" : "rgba(212,196,168,0)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl md:text-3xl text-espresso tracking-tight">
            Ohhi
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/menu" className="hover:text-espresso transition">{t("nav.menu")}</Link>
            <Link href="/#about" className="hover:text-espresso transition">{t("nav.about")}</Link>
            <Link href="/#visit" className="hover:text-espresso transition">{t("nav.visit")}</Link>
            <LanguageToggle />
          </div>
          <button className="md:hidden text-charcoal" onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cream md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-4">
              <span className="font-display text-2xl text-espresso">Ohhi</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 text-2xl font-display">
              <Link href="/menu" onClick={() => setOpen(false)}>{t("nav.menu")}</Link>
              <Link href="/#about" onClick={() => setOpen(false)}>{t("nav.about")}</Link>
              <Link href="/#visit" onClick={() => setOpen(false)}>{t("nav.visit")}</Link>
              <div className="mt-8"><LanguageToggle /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
