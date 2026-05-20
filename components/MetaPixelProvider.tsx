"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface FacebookPixel {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq: FacebookPixel;
    _fbq: FacebookPixel | undefined;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const { hasConsented, canUseMarketing } = useCookieConsent();

  useEffect(() => {
    if (!hasConsented) return;
    if (!canUseMarketing()) return;
    if (!PIXEL_ID) return;

    if (window.fbq?.loaded) return;

    window.fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      if (window.fbq.callMethod) {
        window.fbq.callMethod.apply(window.fbq, arguments as unknown as unknown[]);
      } else {
        window.fbq.queue?.push(arguments);
      }
    } as FacebookPixel;

    if (!window._fbq) window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");

    const handleRouteChange = () => {
      window.fbq("track", "PageView");
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [hasConsented, canUseMarketing]);

  return (
    <>
      {hasConsented && canUseMarketing() && PIXEL_ID && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
      {children}
    </>
  );
}
