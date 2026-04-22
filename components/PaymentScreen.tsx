"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { OrderItem } from "@/lib/orderStore";

// TODO: For production, integrate:
//  - Swish for Merchants API (requires backend + certificate): https://developer.swish.nu/
//  - Stripe for card payments: https://stripe.com/docs/payments/quickstart
// This screen simulates payment for demo purposes — no real money moves.

type Method = "swish" | "card";

export default function PaymentScreen({
  items,
  total,
  tableNumber,
  onCancel,
  onPaid,
}: {
  items: OrderItem[];
  total: number;
  tableNumber: number;
  onCancel: () => void;
  onPaid: (method: Method) => void;
}) {
  const { t } = useTranslation();
  const [method, setMethod] = useState<Method>("swish");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [processing, setProcessing] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    // TODO: Replace this timeout with real payment API call.
    // For Swish: POST to your backend which calls Swish API, then poll for status.
    // For Stripe: use PaymentIntent + stripe.confirmCardPayment().
    setTimeout(() => {
      onPaid(method);
    }, 1500);
  }

  function openSwishApp() {
    // Swish deep-link for mobile. Falls back silently on desktop.
    const amount = total;
    const msg = `Ohhi · Bord ${tableNumber}`;
    // TODO: use a real merchant Swish number configured per cafe.
    window.location.href = `swish://payment?data=${encodeURIComponent(
      JSON.stringify({ version: 1, payee: { value: "1231181189" }, amount: { value: amount }, message: { value: msg } })
    )}`;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-cream">
      <div className="max-w-xl mx-auto px-6 py-10">
        <button onClick={onCancel} className="text-xs tracking-widest uppercase text-stone hover:text-brand-deep mb-8">
          ← {t("payment.back")}
        </button>
        <h1 className="font-display text-4xl md:text-5xl text-brand-deep mb-2">{t("payment.heading")}</h1>
        <p className="text-brand text-sm mb-8">{t("menu.orderingFor")} {tableNumber}</p>

        <div className="border-y border-sand py-6 mb-8">
          <div className="space-y-2 text-sm">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between">
                <span>{it.quantity}× {it.name}</span>
                <span className="tabular-nums text-stone">{it.price * it.quantity} kr</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-sand/60 font-display text-2xl text-brand-deep">
            <span>{t("payment.total")}</span>
            <span>{total} kr</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => setMethod("swish")}
            className={`py-4 text-sm tracking-widest uppercase border transition ${
              method === "swish" ? "bg-brand-deep text-offwhite border-brand-deep" : "border-sand text-brand-deep hover:border-brand-deep"
            }`}
          >
            Swish
          </button>
          <button
            onClick={() => setMethod("card")}
            className={`py-4 text-sm tracking-widest uppercase border transition ${
              method === "card" ? "bg-brand-deep text-offwhite border-brand-deep" : "border-sand text-brand-deep hover:border-brand-deep"
            }`}
          >
            {t("payment.card")}
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {method === "swish" ? (
            <div className="space-y-4">
              <label className="block">
                <div className="text-xs tracking-widest uppercase text-brand mb-2">{t("payment.phone")}</div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07X XXX XX XX"
                  className="w-full border border-sand bg-transparent px-4 py-3 focus:outline-none focus:border-brand-deep"
                />
              </label>
              <button
                type="button"
                onClick={openSwishApp}
                className="w-full border border-brand-deep text-brand-deep py-3 text-xs tracking-widest uppercase hover:bg-brand-deep hover:text-offwhite transition"
              >
                {t("payment.openSwish")} →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <div className="text-xs tracking-widest uppercase text-brand mb-2">{t("payment.cardNumber")}</div>
                <input
                  required
                  inputMode="numeric"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  placeholder="4242 4242 4242 4242"
                  className="w-full border border-sand bg-transparent px-4 py-3 focus:outline-none focus:border-brand-deep tracking-widest"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-xs tracking-widest uppercase text-brand mb-2">{t("payment.expiry")}</div>
                  <input
                    required
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full border border-sand bg-transparent px-4 py-3 focus:outline-none focus:border-brand-deep"
                  />
                </label>
                <label className="block">
                  <div className="text-xs tracking-widest uppercase text-brand mb-2">CVC</div>
                  <input
                    required
                    inputMode="numeric"
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                    placeholder="123"
                    className="w-full border border-sand bg-transparent px-4 py-3 focus:outline-none focus:border-brand-deep"
                  />
                </label>
              </div>
            </div>
          )}

          <button
            disabled={processing}
            className="w-full bg-brand-deep text-offwhite py-4 text-sm tracking-widest uppercase hover:bg-brand-dark transition disabled:opacity-60"
          >
            {processing ? t("payment.processing") : `${t("payment.pay")} ${total} kr →`}
          </button>
          <p className="text-[10px] text-stone text-center tracking-wide">{t("payment.demoNote")}</p>
        </form>
      </div>
    </motion.div>
  );
}
