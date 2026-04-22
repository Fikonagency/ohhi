"use client";
import I18nProvider from "@/components/I18nProvider";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <I18nProvider>
      <AdminDashboard />
    </I18nProvider>
  );
}
