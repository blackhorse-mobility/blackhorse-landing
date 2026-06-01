export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const isGAEnabled = () =>
  typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID) && Boolean(window.gtag);

export const pageview = (url: string) => {
  if (!isGAEnabled()) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = (
  action: string,
  params?: Record<string, unknown>
) => {
  if (!isGAEnabled()) return;

  window.gtag("event", action, params || {});
};

// Toggles Google Consent Mode v2 signals once the user makes a choice.
export const grantAnalyticsConsent = () => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });
};

export const denyAnalyticsConsent = () => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: "denied",
  });
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
