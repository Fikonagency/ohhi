"use client";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { menu, categories, MenuItem } from "@/lib/menuData";
import OrderDrawer from "./OrderDrawer";
import OrderConfirmation from "./OrderConfirmation";
import { addOrder, OrderItem } from "@/lib/orderStore";

export default function OrderableMenu({ tableNumber }: { tableNumber: number | null }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("sv") ? "sv" : "en";
  const orderable = tableNumber !== null;
  const [cart, setCart] = useState<Record<string, { quantity: number; note?: string }>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const cartItems: OrderItem[] = useMemo(() => {
    return Object.entries(cart)
      .filter(([, v]) => v.quantity > 0)
      .map(([id, v]) => {
        const m = menu.find((x) => x.id === id)!;
        return { id, name: lang === "sv" && m.nameSv ? m.nameSv : m.name, price: m.price, quantity: v.quantity, note: v.note };
      });
  }, [cart, lang]);

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  function inc(id: string) {
    setCart((c) => ({ ...c, [id]: { quantity: (c[id]?.quantity || 0) + 1, note: c[id]?.note } }));
  }
  function dec(id: string) {
    setCart((c) => {
      const q = Math.max(0, (c[id]?.quantity || 0) - 1);
      return { ...c, [id]: { quantity: q, note: c[id]?.note } };
    });
  }
  function setNote(id: string, note: string) {
    setCart((c) => ({ ...c, [id]: { quantity: c[id]?.quantity || 0, note } }));
  }

  function submit(generalNote?: string) {
    if (tableNumber === null) return;
    addOrder({ tableNumber, items: cartItems, note: generalNote });
    setCart({});
    setDrawerOpen(false);
    setConfirmed(true);
  }

  if (confirmed) return <OrderConfirmation onBack={() => setConfirmed(false)} />;

  return (
    <div className="pb-28">
      {orderable && (
        <div className="bg-espresso text-cream text-center py-3 text-sm tracking-widest uppercase">
          {t("menu.orderingFor")} {tableNumber}
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div className="text-xs tracking-[0.3em] uppercase text-stone mb-4">Ohhi</div>
        <h1 className="font-display text-5xl md:text-6xl text-espresso mb-12">{t("menu.heading")}</h1>
        <div className="space-y-16">
          {categories.map((cat) => (
            <CategoryBlock
              key={cat.key}
              titleEn={cat.en}
              titleSv={cat.sv}
              note={cat.note ? (lang === "sv" ? cat.note.sv : cat.note.en) : undefined}
              items={menu.filter((m) => m.category === cat.key)}
              lang={lang}
              orderable={orderable}
              cart={cart}
              inc={inc}
              dec={dec}
            />
          ))}
        </div>
      </div>

      {orderable && itemCount > 0 && (
        <motion.button
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-8 md:left-auto md:w-96 bg-espresso text-cream py-4 px-6 flex justify-between items-center z-40 shadow-lg"
        >
          <span className="text-sm tracking-widest uppercase">{t("menu.viewOrder")} ({itemCount})</span>
          <span>→</span>
        </motion.button>
      )}

      <OrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cartItems}
        onNoteChange={setNote}
        onSubmit={submit}
      />
    </div>
  );
}

function CategoryBlock({
  titleEn,
  titleSv,
  note,
  items,
  lang,
  orderable,
  cart,
  inc,
  dec,
}: {
  titleEn: string;
  titleSv: string;
  note?: string;
  items: MenuItem[];
  lang: "en" | "sv";
  orderable: boolean;
  cart: Record<string, { quantity: number; note?: string }>;
  inc: (id: string) => void;
  dec: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-xs tracking-[0.3em] uppercase text-stone">{lang === "sv" ? titleSv : titleEn}</h2>
        {note && <span className="text-xs text-stone">{note}</span>}
      </div>
      <div className="space-y-4">
        {items.map((it) => {
          const qty = cart[it.id]?.quantity || 0;
          const name = lang === "sv" && it.nameSv ? it.nameSv : it.name;
          return (
            <div key={it.id} className="flex items-center gap-4 pb-4 border-b border-sand/60">
              <div className="flex-1">
                <div className="text-charcoal">{name}</div>
              </div>
              <div className="text-stone tabular-nums text-sm w-16 text-right">{it.price} kr</div>
              {orderable && (
                <div className="flex items-center gap-2 w-24 justify-end">
                  {qty > 0 && (
                    <>
                      <button onClick={() => dec(it.id)} className="w-7 h-7 border border-stone text-stone hover:bg-stone hover:text-cream transition">−</button>
                      <span className="w-5 text-center tabular-nums">{qty}</span>
                    </>
                  )}
                  <button onClick={() => inc(it.id)} className="w-7 h-7 border border-espresso text-espresso hover:bg-espresso hover:text-cream transition">+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
