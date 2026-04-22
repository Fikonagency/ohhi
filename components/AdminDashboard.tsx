"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Order, OrderStatus, loadOrders, updateOrderStatus } from "@/lib/orderStore";

const PIN = "ohhi2025";
const COLUMNS: OrderStatus[] = ["pending", "preparing", "ready", "served"];
const NEXT: Record<OrderStatus, OrderStatus | null> = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
  served: null,
};

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const knownIdsRef = useRef<Set<string>>(new Set());
  const titleIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("ohhi_admin") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;

    function playBeep() {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = "sine";
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        o.start();
        o.stop(ctx.currentTime + 0.35);
      } catch {}
    }

    function flashTitle() {
      if (titleIntervalRef.current) return;
      const original = document.title;
      let on = true;
      titleIntervalRef.current = window.setInterval(() => {
        document.title = on ? "● NY BESTÄLLNING · Ohhi" : original;
        on = !on;
      }, 900);
      const stop = () => {
        if (titleIntervalRef.current) {
          clearInterval(titleIntervalRef.current);
          titleIntervalRef.current = null;
        }
        document.title = original;
        window.removeEventListener("focus", stop);
        document.removeEventListener("visibilitychange", onVis);
      };
      const onVis = () => { if (!document.hidden) stop(); };
      window.addEventListener("focus", stop);
      document.addEventListener("visibilitychange", onVis);
    }

    function refresh() {
      const next = loadOrders();
      const currentIds = new Set(next.map((o) => o.id));
      const newOnes = next.filter((o) => o.status === "pending" && !knownIdsRef.current.has(o.id));
      if (knownIdsRef.current.size > 0 && newOnes.length > 0) {
        playBeep();
        flashTitle();
        setFlashIds((prev) => {
          const s = new Set(prev);
          newOnes.forEach((n) => s.add(n.id));
          return s;
        });
        setTimeout(() => {
          setFlashIds((prev) => {
            const s = new Set(prev);
            newOnes.forEach((n) => s.delete(n.id));
            return s;
          });
        }, 4000);
      }
      knownIdsRef.current = currentIds;
      setOrders(next);
    }

    refresh();
    const i = window.setInterval(refresh, 3000);
    const onChange = () => refresh();
    window.addEventListener("ohhi_orders_changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      clearInterval(i);
      window.removeEventListener("ohhi_orders_changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pinInput === PIN) {
              sessionStorage.setItem("ohhi_admin", "1");
              setAuthed(true);
            } else {
              setError(true);
            }
          }}
          className="w-full max-w-xs space-y-4"
        >
          <div className="font-display text-3xl text-cream text-center mb-8">Ohhi</div>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value);
              setError(false);
            }}
            placeholder={t("admin.pin")}
            className="w-full bg-transparent border-b border-stone text-cream py-2 text-center focus:outline-none focus:border-cream"
          />
          {error && <p className="text-sand text-sm text-center">{t("admin.wrong")}</p>}
          <button className="w-full bg-cream text-charcoal py-3 text-xs tracking-widest uppercase">{t("admin.login")}</button>
        </form>
      </div>
    );
  }

  function move(id: string, from: OrderStatus) {
    const next = NEXT[from];
    if (!next) return;
    updateOrderStatus(id, next);
    setOrders(loadOrders());
  }

  return (
    <div className="min-h-screen bg-charcoal text-cream p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="font-display text-2xl">Ohhi · Kitchen</div>
        <a href="/admin/qr" className="text-xs tracking-widest uppercase text-sand hover:text-cream">QR Codes →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colOrders = orders.filter((o) => o.status === col).sort((a, b) => a.createdAt - b.createdAt);
          return (
            <div key={col} className="bg-[#22261F] p-4 min-h-[60vh]">
              <div className="text-xs tracking-widest uppercase text-sand mb-4 flex justify-between">
                <span>{t(`admin.${col}`)}</span>
                <span>{colOrders.length}</span>
              </div>
              <div className="space-y-3">
                {colOrders.length === 0 && <div className="text-stone text-xs">{t("admin.noOrders")}</div>}
                {colOrders.map((o) => (
                  <OrderCard key={o.id} order={o} onAdvance={() => move(o.id, col)} isNew={flashIds.has(o.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({ order, onAdvance, isNew }: { order: Order; onAdvance: () => void; isNew: boolean }) {
  const { t } = useTranslation();
  const [elapsed, setElapsed] = useState(() => Math.floor((Date.now() - order.createdAt) / 60000));
  useEffect(() => {
    const i = setInterval(() => setElapsed(Math.floor((Date.now() - order.createdAt) / 60000)), 30000);
    return () => clearInterval(i);
  }, [order.createdAt]);
  const next = NEXT[order.status];
  return (
    <div className={`bg-cream text-charcoal p-3 text-sm ${isNew ? "flash-new" : ""} ${isNew ? "ring-2 ring-brand" : ""}`}>
      <div className="flex justify-between mb-2">
        <span className="font-display text-brand-deep">{t("admin.table")} {order.tableNumber}</span>
        <span className="text-xs text-stone">{elapsed}m</span>
      </div>
      <div className="space-y-1 mb-3">
        {order.items.map((it) => (
          <div key={it.id}>
            <div>{it.quantity}× {it.name}</div>
            {it.note && <div className="text-xs text-stone italic">— {it.note}</div>}
          </div>
        ))}
      </div>
      {order.note && <div className="text-xs text-stone italic mb-3 border-t border-sand/60 pt-2">{order.note}</div>}
      <div className="flex justify-between items-center mb-3 text-xs">
        <span className="text-stone uppercase tracking-widest">
          {order.paid ? `✓ ${order.paymentMethod === "swish" ? "Swish" : "Kort"}` : "Obetald"}
        </span>
        <span className="tabular-nums text-brand-deep">{order.total} kr</span>
      </div>
      {next && (
        <button onClick={onAdvance} className="w-full bg-brand-deep text-cream text-xs tracking-widest uppercase py-2 hover:bg-brand-dark transition">
          → {t(`admin.${next}`)}
        </button>
      )}
    </div>
  );
}
