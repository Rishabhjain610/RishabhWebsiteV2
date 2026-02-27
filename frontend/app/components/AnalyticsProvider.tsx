"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const DEFAULT_GA_ID = "G-BJQ7X7GGWZ";

export default function AnalyticsProvider({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  const id = gaId ?? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? DEFAULT_GA_ID;

  useEffect(() => {
    if (!id) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("config", id, { page_path: pathname });
  }, [id, pathname]);

  return null;
}