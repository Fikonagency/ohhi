"use client";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-sand mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center gap-6 justify-between text-sm">
        <div className="font-display text-2xl text-espresso">Ohhi</div>
        <div className="text-stone text-center">
          Beijerskajen 2, Malmö · <a href="mailto:hello@ohhi.se" className="hover:text-espresso">hello@ohhi.se</a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-stone hover:text-espresso">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-6 text-[10px] tracking-widest uppercase text-stone text-center">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
