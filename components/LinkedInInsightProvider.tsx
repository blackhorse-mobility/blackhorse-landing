"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCookieConsent } from "@/hooks/useCookieConsent";

declare global {
  interface Window {
    lintrk: ((action: string, ...args: unknown[]) => void) & { q?: unknown[]; loaded?: boolean };
    _linkedin_data_partner_ids: string[];
  }
}

const PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export function LinkedInInsightProvider({ children }: { children: React.ReactNode }) {
  const { hasConsented, canUseMarketing } = useCookieConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!hasConsented) return;
    if (!canUseMarketing()) return;
    if (!PARTNER_ID) return;

    if (window.lintrk?.loaded) return;

    window.lintrk = function (a, b) {
      window.lintrk.q ??= [];
      window.lintrk.q.push([a, b]);
    } as typeof window.lintrk;
    window.lintrk.q = [];
    window.lintrk.loaded = true;

    window._linkedin_data_partner_ids ??= [];
    window._linkedin_data_partner_ids.push(PARTNER_ID);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(script);
  }, [hasConsented, canUseMarketing]);

  useEffect(() => {
    if (!hasConsented) return;
    if (!canUseMarketing()) return;
    if (!PARTNER_ID) return;
    if (!window.lintrk) return;

    window.lintrk("track", "PageView");
  }, [hasConsented, canUseMarketing, pathname, searchParams]);

  return (
    <>
      {hasConsented && canUseMarketing() && PARTNER_ID && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`}
          />
        </noscript>
      )}
      {children}
    </>
  );
}
