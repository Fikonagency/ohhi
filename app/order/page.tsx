"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OrderRedirect() {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const qs = params.toString();
    router.replace(`/menu${qs ? `?${qs}` : ""}`);
  }, [router, params]);
  return null;
}

export default function OrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderRedirect />
    </Suspense>
  );
}
