"use client";

import { useCallback } from "react";
import {
  trackEvent,
  trackButtonClick,
  trackFormInteraction,
  trackSignup,
  trackViewModeChange,
  trackScrollDepth,
} from "@/lib/hubspot";


export function useHubSpotTracking() {
  const onClickButton = useCallback(
    (buttonName: string, section?: string, properties?: Record<string, any>) => {
      trackButtonClick(buttonName, section, properties);
    },
    []
  );

  const onFormInteraction = useCallback(
    (
      formName: string,
      action: "focus" | "submit" | "error",
      properties?: Record<string, any>
    ) => {
      trackFormInteraction(formName, action, properties);
    },
    []
  );

  const onSignup = useCallback(
    (
      email: string,
      signupType: "waitlist" | "demo" | "registration",
      properties?: Record<string, any>
    ) => {
      trackSignup(email, signupType, properties);
    },
    []
  );

  const onViewModeChange = useCallback((from: string, to: string) => {
    trackViewModeChange(from, to);
  }, []);

  const onScroll = useCallback((depth: number) => {
    trackScrollDepth(depth);
  }, []);

  const onCustomEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      trackEvent(eventName, properties);
    },
    []
  );

  return {
    onClickButton,
    onFormInteraction,
    onSignup,
    onViewModeChange,
    onScroll,
    onCustomEvent,
  };
}
