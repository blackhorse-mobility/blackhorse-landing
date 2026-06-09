"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewMode } from "@/components/InteractiveHero";
import {
  buildLandingUrl,
  getSectionsForMode,
  readUrlState,
  viewModeToPageParam,
} from "@/lib/landing-url";

function scrollToSectionWhenReady(
  sectionId: string,
  onStart: () => void,
  onEnd: () => void,
  retries = 0,
) {
  const element = document.getElementById(sectionId);
  if (element) {
    onStart();
    element.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(onEnd, 800);
    return;
  }

  if (retries < 30) {
    requestAnimationFrame(() =>
      scrollToSectionWhenReady(sectionId, onStart, onEnd, retries + 1),
    );
  }
}

export function useLandingPageUrl() {
  const initialUrlState =
    typeof window !== "undefined" ? readUrlState() : null;

  const [viewMode, setViewModeState] = useState<ViewMode>(
    initialUrlState?.viewMode ?? "corporate",
  );
  const isProgrammaticScroll = useRef(false);
  const pendingSectionRef = useRef<string | null>(
    initialUrlState?.sectionId ?? null,
  );
  const hasScrolledToInitialSection = useRef(false);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    window.history.pushState(
      null,
      "",
      buildLandingUrl(viewModeToPageParam(mode)),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string, mode: ViewMode = viewMode) => {
      isProgrammaticScroll.current = true;
      window.history.pushState(
        null,
        "",
        buildLandingUrl(viewModeToPageParam(mode), sectionId),
      );
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });

      window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    },
    [viewMode],
  );

  const updateSectionInUrl = useCallback(
    (sectionId: string | null, mode: ViewMode) => {
      const current = readUrlState();
      const nextSection = sectionId ?? "";
      const currentSection = current.sectionId ?? "";

      if (current.viewMode === mode && currentSection === nextSection) {
        return;
      }

      window.history.replaceState(
        null,
        "",
        buildLandingUrl(viewModeToPageParam(mode), sectionId),
      );
    },
    [],
  );

  // Ensure the page query param is always present in the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("page")) {
      window.history.replaceState(
        null,
        "",
        buildLandingUrl(viewModeToPageParam(viewMode), readUrlState().sectionId),
      );
    }
  }, [viewMode]);

  // Scroll to a deep-linked section once the correct page content has mounted.
  useEffect(() => {
    if (hasScrolledToInitialSection.current || !pendingSectionRef.current) {
      return;
    }

    hasScrolledToInitialSection.current = true;
    const sectionId = pendingSectionRef.current;
    pendingSectionRef.current = null;

    scrollToSectionWhenReady(
      sectionId,
      () => {
        isProgrammaticScroll.current = true;
      },
      () => {
        isProgrammaticScroll.current = false;
      },
    );
  }, [viewMode]);

  // Keep state in sync when the user uses browser back/forward.
  useEffect(() => {
    const handlePopState = () => {
      const { viewMode: mode, sectionId } = readUrlState();
      setViewModeState(mode);

      if (sectionId) {
        scrollToSectionWhenReady(
          sectionId,
          () => {
            isProgrammaticScroll.current = true;
          },
          () => {
            isProgrammaticScroll.current = false;
          },
        );
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update the URL hash as the user scrolls through sections.
  useEffect(() => {
    const sectionIds = getSectionsForMode(viewMode);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) {
          if (window.scrollY < 200) {
            updateSectionInUrl(null, viewMode);
          }
          return;
        }

        const sectionId = visible[0].target.id;
        updateSectionInUrl(sectionId, viewMode);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.5, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [viewMode, updateSectionInUrl]);

  return {
    viewMode,
    setViewMode,
    navigateToSection,
  };
}
