const FALLBACK_SITE_URL = "https://black-horse.online";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
);

export function getSiteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
