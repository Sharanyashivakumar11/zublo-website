import { siteNav } from "./site-nav";

/** Update NEXT_PUBLIC_CALENDLY_URL in web/.env.local with your Calendly event link. */
export const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export const contactInfo = {
  phoneHref: "tel:+12132680491",
  phoneDisplay: "(213) 268-0491",
  emailHref: "mailto:contact@zublo.co",
  emailDisplay: "contact@zublo.co",
} as const;

/** Update these when wiring up forms or new routes on the main site. */
export const ctaLinks = {
  contact: siteNav.contact,
  freeAudit: "/90-days/#free-audit",
  bookCall: "/90-days/#book-call",
  workWithZublo: `${siteNav.contact}?source=90-days`,
} as const;
