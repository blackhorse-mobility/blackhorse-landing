

export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "YOUR_PORTAL_ID";


export const initHubSpot = () => {
  if (typeof window === "undefined") return;

 
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "hs-script-loader";
  script.async = true;
  script.defer = true;
  script.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
  document.head.appendChild(script);
};


export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.hsTrackEvent) return;

  try {
    window.hsTrackEvent({
      id: "page-view",
      value: pageName,
      ...properties,
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};


export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window === "undefined" || !window.hsTrackEvent) return;

  try {
    window.hsTrackEvent({
      id: eventName,
      ...properties,
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};


export const trackFormInteraction = (
  formName: string,
  action: "focus" | "submit" | "error",
  properties?: Record<string, any>
) => {
  if (typeof window === "undefined") return;

  try {
    const eventName = `form_${action}_${formName}`;
    trackEvent(eventName, {
      form_name: formName,
      action,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error("Error tracking form interaction:", error);
  }
};


export const trackButtonClick = (
  buttonName: string,
  section?: string,
  properties?: Record<string, any>
) => {
  trackEvent(`button_click_${buttonName}`, {
    button_name: buttonName,
    section: section,
    timestamp: new Date().toISOString(),
    ...properties,
  });
};


export const trackViewModeChange = (from: string, to: string) => {
  trackEvent("view_mode_changed", {
    from_mode: from,
    to_mode: to,
    timestamp: new Date().toISOString(),
  });
};


export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", {
    scroll_percentage: depth,
    timestamp: new Date().toISOString(),
  });
};


export const identifyUser = (email: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  try {
    // Use HubSpot's identify method if available
    if (window._hsq) {
      window._hsq.push([
        "identify",
        {
          email: email,
          ...properties,
        },
      ]);
    }
  } catch (error) {
    console.error("Error identifying user:", error);
  }
};


export const trackSignup = (
  email: string,
  signupType: "waitlist" | "demo" | "registration",
  properties?: Record<string, any>
) => {
  if (typeof window === "undefined") return;

  try {
    // First identify the user
    identifyUser(email, {
      signup_type: signupType,
      ...properties,
    });

    // Then track the event
    trackEvent("user_signup", {
      email,
      signup_type: signupType,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error("Error tracking signup:", error);
  }
};


declare global {
  interface Window {
    hsTrackEvent?: (event: Record<string, any>) => void;
    _hsq?: any[];
    hbspt?: any;
  }
}
