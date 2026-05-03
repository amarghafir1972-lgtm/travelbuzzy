import { useState, useEffect, useCallback } from "react";

const KEY = "tb_recently_viewed";
const MAX = 6;

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // ignore quota errors
  }
}

export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState<string[]>(read);

  const record = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX);
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSlugs([]);
    localStorage.removeItem(KEY);
  }, []);

  // Sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === KEY) setSlugs(read());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { slugs, record, clear };
}
