import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "travelbuzzy_wishlist";
const COMPARE_KEY = "travelbuzzy_compare";

function readStorage(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function writeStorage(key: string, value: string[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useWishlist() {
  const [saved, setSaved] = useState<string[]>(() => readStorage(STORAGE_KEY));
  const [compare, setCompare] = useState<string[]>(() => readStorage(COMPARE_KEY));

  useEffect(() => { writeStorage(STORAGE_KEY, saved); }, [saved]);
  useEffect(() => { writeStorage(COMPARE_KEY, compare); }, [compare]);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);

  const toggleCompare = useCallback((slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  }, []);

  const inCompare = useCallback((slug: string) => compare.includes(slug), [compare]);

  const clearCompare = useCallback(() => setCompare([]), []);

  const removeFromWishlist = useCallback((slug: string) => {
    setSaved((prev) => prev.filter((s) => s !== slug));
    setCompare((prev) => prev.filter((s) => s !== slug));
  }, []);

  return { saved, compare, toggle, isSaved, toggleCompare, inCompare, clearCompare, removeFromWishlist };
}
