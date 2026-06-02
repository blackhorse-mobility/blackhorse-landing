"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  pageview,
  grantAnalyticsConsent,
  denyAnalyticsConsent,
} from "@/lib/gtag";
import { useCookieConsent } from "@/hooks/useCookieConsent";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { canUseAnalytics } = useCookieConsent();

  useEffect(() => {
    if (!pathname || !canUseAnalytics()) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    pageview(url);
  }, [pathname, searchParams, canUseAnalytics]);

  return null;
}

export default function GoogleAnalytics() {
  const { hasConsented, canUseAnalytics } = useCookieConsent();

  // Keep Google Consent Mode in sync with the user's cookie choices.
  useEffect(() => {
    if (!hasConsented) return;

    if (canUseAnalytics()) {
      grantAnalyticsConsent();
      // The initial pageview was sent under "denied" consent, so re-send it
      // now that analytics_storage is granted.
      pageview(window.location.pathname + window.location.search);
    } else {
      denyAnalyticsConsent();
    }
  }, [hasConsented, canUseAnalytics]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        `}
      </Script>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
