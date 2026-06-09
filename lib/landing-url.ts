import type { ViewMode } from "@/components/InteractiveHero";

export const CORPORATE_PAGE = "corporate-client";
export const FLEET_PAGE = "fleet";

export const CORPORATE_SECTIONS = [
  "corporate-features",
  "corporate-how-it-works",
  "corporate-customers",
  "corporate-faqs",
] as const;

export const FLEET_SECTIONS = [
  "fleet-benefits",
  "fleet-features",
  "fleet-faqs",
] as const;

export function viewModeToPageParam(mode: ViewMode): string {
  return mode === "corporate" ? CORPORATE_PAGE : FLEET_PAGE;
}

export function pageParamToViewMode(page: string | null): ViewMode | null {
  if (page === CORPORATE_PAGE) return "corporate";
  if (page === FLEET_PAGE) return "fleet";
  return null;
}

export function getSectionsForMode(mode: ViewMode): readonly string[] {
  return mode === "corporate" ? CORPORATE_SECTIONS : FLEET_SECTIONS;
}

export function readUrlState(): { viewMode: ViewMode; sectionId: string | null } {
  if (typeof window === "undefined") {
    return { viewMode: "corporate", sectionId: null };
  }

  const params = new URLSearchParams(window.location.search);
  const viewMode = pageParamToViewMode(params.get("page")) ?? "corporate";
  const sectionId = window.location.hash.replace("#", "") || null;

  return { viewMode, sectionId };
}

export function buildLandingUrl(page: string, sectionId?: string | null) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", page);
  url.hash = sectionId ? sectionId : "";
  return url.toString();
}
