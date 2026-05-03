import { useState, useEffect } from "react";

export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
};

const STORAGE_KEY = "tb_cookie_consent";

function getStored(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

function store(consent: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStored();
    if (stored) {
      setConsent(stored);
      setVisible(false);
    } else {
      // Short delay so the banner doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function acceptAll() {
    const c: CookieConsent = { analytics: true, marketing: true, decided: true };
    store(c);
    setConsent(c);
    setVisible(false);
  }

  function rejectAll() {
    const c: CookieConsent = { analytics: false, marketing: false, decided: true };
    store(c);
    setConsent(c);
    setVisible(false);
  }

  function saveCustom(analytics: boolean, marketing: boolean) {
    const c: CookieConsent = { analytics, marketing, decided: true };
    store(c);
    setConsent(c);
    setVisible(false);
  }

  function resetConsent() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setConsent(null);
    setVisible(true);
  }

  return { consent, visible, acceptAll, rejectAll, saveCustom, resetConsent };
}
