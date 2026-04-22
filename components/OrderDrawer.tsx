"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { OrderItem } from "@/lib/orderStore";

export default function OrderDrawer({
  open,
  onClose,
  items,
  onNoteChange,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  items: OrderItem[];
  onNoteChange: (id: string, note: string) => void;
  onCheckout: (generalNote?: string) => void;
}) {
  const { t } = useTranslation();
  const [generalNote, setGeneralNote] = useState("");
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/50 z-50"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-[60] bg-cream max-h-[90vh] overflow-y-auto rounded-t-lg"
          >
            <div className="max-w-2xl mx-auto px-6 py-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-3xl text-brand-deep">{t("menu.viewOrder")}</h3>
                <button onClick={onClose} className="text-stone" aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
              </div>
              {items.length === 0 ? (
                <p className="text-stone">{t("menu.empty")}</p>
              ) : (
                <div className="space-y-6">
                  {items.map((it) => (
                    <div key={it.id} className="pb-4 border-b border-sand/60">
                      <div className="flex justify-between items-baseline">
                        <div className="text-charcoal">
                          {it.quantity}× {it.name}
                        </div>
                        <div className="text-stone tabular-nums">{it.price * it.quantity} kr</div>
                      </div>
                      <input
                        type="text"
                        placeholder={t("menu.addNote")}
                        defaultValue={it.note}
                        onChange={(e) => onNoteChange(it.id, e.target.value)}
                        className="mt-2 w-full bg-transparent border-b border-sand text-sm py-1 focus:outline-none focus:border-brand-deep"
                      />
                    </div>
                  ))}
                  <div className="flex justify-between pt-4 font-display text-xl text-brand-deep">
                    <span>{t("payment.total")}</span>
                    <span>{total} kr</span>
                  </div>
                  <textarea
                    placeholder={t("menu.generalNote")}
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    className="w-full border border-sand bg-transparent p-3 text-sm h-20 focus:outline-none focus:border-brand-deep"
                  />
                  <button
                    onClick={() => onCheckout(generalNote || undefined)}
                    className="w-full bg-brand-deep text-offwhite py-4 text-sm tracking-widest uppercase hover:bg-brand-dark transition"
                  >
                    {t("payment.toCheckout")} →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
