"use client";

import { useEffect } from "react";
import { initHubSpot, trackPageView } from "@/lib/hubspot";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function HubSpotProvider({ children }: { children: React.ReactNode }) {
  const { hasConsented, canUseAnalytics } = useCookieConsent();

  useEffect(() => {

    if (!hasConsented) return;

    if (!canUseAnalytics()) return;

    initHubSpot();

    trackPageView(window.location.pathname);

    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [hasConsented, canUseAnalytics]);

  return <>{children}</>;
}
