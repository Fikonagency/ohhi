"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRGenerator() {
  const [count, setCount] = useState(8);
  const [baseUrl, setBaseUrl] = useState("https://ohhi.se/order");

  const tables = Array.from({ length: Math.max(1, Math.min(20, count)) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <div className="no-print max-w-3xl mx-auto px-6 py-10 border-b border-sand">
        <div className="flex justify-between items-center mb-6">
          <div className="font-display text-3xl text-espresso">QR Codes</div>
          <a href="/admin" className="text-xs tracking-widest uppercase text-stone hover:text-espresso">← Dashboard</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <label className="block">
            <div className="text-xs tracking-widest uppercase text-stone mb-2">Tables</div>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full border border-sand bg-transparent px-3 py-2"
            />
          </label>
          <label className="block">
            <div className="text-xs tracking-widest uppercase text-stone mb-2">Base URL</div>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full border border-sand bg-transparent px-3 py-2"
            />
          </label>
        </div>
        <button onClick={() => window.print()} className="bg-espresso text-cream px-6 py-3 text-xs tracking-widest uppercase">
          Print
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 print:grid-cols-2">
        {tables.map((n) => {
          const url = `${baseUrl}?table=${n}`;
          return (
            <div key={n} className="qr-card border border-stone/40 p-6 flex flex-col items-center text-center bg-offwhite">
              <div className="font-display text-2xl text-espresso mb-1">Ohhi</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-stone mb-4">Beijerskajen 2</div>
              <div className="bg-white p-3 border border-sand">
                <QRCodeSVG value={url} size={180} bgColor="#FAFAF7" fgColor="#1C1C1C" level="M" />
              </div>
              <div className="mt-4 font-display text-xl text-espresso">Scan to order · Table {n}</div>
              <div className="text-[10px] text-stone mt-1 break-all">{url}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
