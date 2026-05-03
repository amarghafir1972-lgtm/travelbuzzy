import { useState, useEffect, useCallback } from "react";

export interface PriceAlert {
  slug: string;
  destinationName: string;
  email: string;
  month: number;
  createdAt: number;
}

const KEY = "travelbuzzy_price_alerts";

function readAlerts(): PriceAlert[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as PriceAlert[];
  } catch {
    return [];
  }
}

function writeAlerts(alerts: PriceAlert[]) {
  localStorage.setItem(KEY, JSON.stringify(alerts));
}

export function usePriceAlerts(slug: string) {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => readAlerts());

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === KEY) setAlerts(readAlerts());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const existing = alerts.find((a) => a.slug === slug) ?? null;

  const addAlert = useCallback(
    (email: string, month: number, destinationName: string) => {
      setAlerts((prev) => {
        const filtered = prev.filter((a) => a.slug !== slug);
        const next: PriceAlert[] = [
          ...filtered,
          { slug, destinationName, email, month, createdAt: Date.now() },
        ];
        writeAlerts(next);
        return next;
      });
    },
    [slug]
  );

  const removeAlert = useCallback(() => {
    setAlerts((prev) => {
      const next = prev.filter((a) => a.slug !== slug);
      writeAlerts(next);
      return next;
    });
  }, [slug]);

  return { existing, addAlert, removeAlert };
}
