import { useState, useEffect } from "react";

export type CookieCategory = "essential" | "analytics" | "marketing";

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const COOKIE_STORAGE_KEY = "bh-cookie-consent";
const COOKIE_EXPIRY_DAYS = 365;

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasConsented, setHasConsented] = useState(false);

 
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        setConsent(parsed);
        setHasConsented(true);
      }
    } catch (error) {
      console.error("Error loading cookie consent:", error);
    }
  }, []);

  const saveConsent = (categories: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      essential: true, 
      analytics: categories.analytics || false,
      marketing: categories.marketing || false,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);
      setHasConsented(true);
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  };

  const acceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
    });
  };

  const updateConsent = (categories: Partial<CookieConsent>) => {
    saveConsent(categories);
  };

  const canUseAnalytics = () => {
    return consent?.analytics === true;
  };

  const canUseMarketing = () => {
    return consent?.marketing === true;
  };

  return {
    consent,
    hasConsented,
    saveConsent,
    acceptAll,
    rejectAll,
    updateConsent,
    canUseAnalytics,
    canUseMarketing,
  };
}
