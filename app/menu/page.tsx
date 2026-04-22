"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import I18nProvider from "@/components/I18nProvider";
import Navbar from "@/components/Navbar";
import OrderableMenu from "@/components/OrderableMenu";
import Footer from "@/components/Footer";

function MenuInner() {
  const params = useSearchParams();
  const tableRaw = params.get("table");
  const table = tableRaw && !Number.isNaN(Number(tableRaw)) ? Number(tableRaw) : null;
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <OrderableMenu tableNumber={table} />
      </main>
      <Footer />
    </>
  );
}

export default function MenuPage() {
  return (
    <I18nProvider>
      <Suspense fallback={null}>
        <MenuInner />
      </Suspense>
    </I18nProvider>
  );
}
