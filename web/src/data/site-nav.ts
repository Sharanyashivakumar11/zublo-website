/** Main site pages — static HTML at clean paths; 90 Days is the Next.js route. */
export const siteNav = {
  home: "/",
  services: "/services/",
  work: "/work/",
  contact: "/contact/",
  ninetyDays: "/90-days/",
} as const;

export type SiteNavKey = keyof typeof siteNav;

/** In-page anchor links for this landing page only. */
export const pageNavLinks = [
  { label: "Industries", href: "#industries" },
  { label: "Our Method", href: "#method" },
  { label: "Why Zublo", href: "#why-zublo" },
] as const;
