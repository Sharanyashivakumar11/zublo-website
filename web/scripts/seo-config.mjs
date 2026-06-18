export const SITE_URL = "https://zublo.co";
export const SITE_NAME = "Zublo";
export const OG_IMAGE_PATH = "/og-image.png";
export const DEFAULT_OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = "Zublo — LA digital marketing for websites, SEO, and growth";

export const defaultDescription =
  "Zublo is a Los Angeles digital marketing studio helping businesses launch websites, improve SEO, and grow with practical marketing systems in as little as 20 days.";

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": organizationId,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_OG_IMAGE,
  email: "contact@zublo.co",
  description: defaultDescription,
  areaServed: { "@type": "City", name: "Los Angeles" },
  knowsAbout: [
    "Web Design",
    "App Development",
    "Local SEO",
    "Content Marketing",
    "Digital Marketing",
    "Conversion Optimization",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  name: SITE_NAME,
  url: SITE_URL,
  description: defaultDescription,
  publisher: { "@id": organizationId },
  inLanguage: "en-US",
};

function pageUrl(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function webPageJsonLd({ path, name, description, type = "WebPage" }) {
  return {
    "@type": type,
    "@id": `${pageUrl(path)}#webpage`,
    name,
    description,
    url: pageUrl(path),
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en-US",
  };
}

function articleJsonLd({ path, headline, description, datePublished = "2025-01-01" }) {
  return {
    "@type": "Article",
    "@id": `${pageUrl(path)}#article`,
    headline,
    description,
    url: pageUrl(path),
    datePublished,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    inLanguage: "en-US",
  };
}

/** @type {Record<string, { path: string; title: string; description: string; type?: string; jsonLd?: object }>} */
export const pageSeo = {
  "index.html": {
    path: "/",
    title: "Los Angeles Web Design, SEO & Growth Marketing | Zublo",
    description: defaultDescription,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [organizationJsonLd, websiteJsonLd, webPageJsonLd({
        path: "/",
        name: "Los Angeles Web Design, SEO & Growth Marketing | Zublo",
        description: defaultDescription,
      })],
    },
  },
  "services.html": {
    path: "/services/",
    title: "Web Design, SEO & Marketing Services Los Angeles | Zublo",
    description:
      "Websites, landing pages, local SEO, content systems, analytics, apps, and white-label marketing services for growing businesses in Los Angeles.",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        webPageJsonLd({
          path: "/services/",
          name: "Web Design, SEO & Marketing Services Los Angeles",
          description:
            "Websites, landing pages, local SEO, content systems, analytics, apps, and white-label marketing services for growing businesses in Los Angeles.",
        }),
        {
          "@type": "ItemList",
          name: "Zublo Services",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Websites", description: "Conversion-focused sites launched in 20 days" },
            { "@type": "ListItem", position: 2, name: "Apps", description: "Mobile and web app design and development" },
            { "@type": "ListItem", position: 3, name: "SEO", description: "Local SEO, Google Business Profile, and search visibility" },
            { "@type": "ListItem", position: 4, name: "Content Systems", description: "Instagram, Reels, and social content engines" },
            { "@type": "ListItem", position: 5, name: "White-Label", description: "Agency partnerships and white-label delivery" },
            { "@type": "ListItem", position: 6, name: "Campaigns", description: "Paid and organic growth campaigns" },
          ],
        },
      ],
    },
  },
  "work.html": {
    path: "/work/",
    title: "Marketing, SEO & Website Case Studies | Zublo",
    description:
      "Explore website, SEO, content, and e-commerce projects including PlayMap LA, AnyTimeEats, Shirokin Shochu, and Ruthuparna Sharma.",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        {
          ...webPageJsonLd({
            path: "/work/",
            name: "Marketing, SEO & Website Case Studies",
            description:
              "Explore website, SEO, content, and e-commerce projects including PlayMap LA, AnyTimeEats, Shirokin Shochu, and Ruthuparna Sharma.",
          }),
          "@type": "CollectionPage",
        },
        {
          "@type": "ItemList",
          name: "Zublo Case Studies",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "PlayMap LA", url: `${SITE_URL}/case-study-playmap-la/` },
            { "@type": "ListItem", position: 2, name: "Shirokin", url: `${SITE_URL}/case-study-shirokin/` },
            { "@type": "ListItem", position: 3, name: "Content Systems", url: `${SITE_URL}/case-study-content-systems/` },
            { "@type": "ListItem", position: 4, name: "ATE", url: `${SITE_URL}/case-study-ate/` },
            { "@type": "ListItem", position: 5, name: "Ruthuparna Sharma Workshop", url: `${SITE_URL}/case-study-ruthuparna/` },
          ],
        },
      ],
    },
  },
  "contact.html": {
    path: "/contact/",
    title: "Book a Free Marketing Strategy Call | Zublo",
    description:
      "Talk to Zublo about websites, SEO, marketing, content systems, or growth opportunities. Reply within 24 hours.",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        {
          ...webPageJsonLd({
            path: "/contact/",
            name: "Book a Free Marketing Strategy Call",
            description:
              "Talk to Zublo about websites, SEO, marketing, content systems, or growth opportunities. Reply within 24 hours.",
          }),
          "@type": "ContactPage",
        },
      ],
    },
  },
  "case-study-ate.html": {
    path: "/case-study-ate/",
    title: "ATE E-Commerce Case Study | Zublo",
    description:
      "How Zublo built a recipe-led Indian e-commerce storefront for ATE — educational product pages, smart cross-sells, and conversion-focused design.",
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        articleJsonLd({
          path: "/case-study-ate/",
          headline: "ATE E-Commerce Case Study",
          description:
            "Recipe-led shopping experience that educates Indian consumers and drives e-commerce conversions.",
        }),
      ],
    },
  },
  "case-study-content-systems.html": {
    path: "/case-study-content-systems/",
    title: "Instagram Content Systems Case Study | Zublo",
    description:
      "Reels, carousels, and posting systems that keep brands visible. See how Zublo built a content engine for consistent Instagram engagement.",
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        articleJsonLd({
          path: "/case-study-content-systems/",
          headline: "Instagram Content Systems Case Study",
          description:
            "Ongoing content strategy, ideation, and execution built for consistency, discoverability, and engagement.",
        }),
      ],
    },
  },
  "case-study-ruthuparna.html": {
    path: "/case-study-ruthuparna/",
    title: "Ruthuparna Sharma Workshop Landing Page | Zublo",
    description:
      "Wireframe-to-launch landing page for Ruthuparna Sharma's 5 A.M. Workshop — fast, focused conversion design built in days, not weeks.",
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        articleJsonLd({
          path: "/case-study-ruthuparna/",
          headline: "Ruthuparna Sharma Workshop Landing Page",
          description:
            "Fast, focused conversion design for a wellness workshop landing page.",
        }),
      ],
    },
  },
  "case-study-playmap-la.html": {
    path: "/case-study-playmap-la/",
    title: "PlayMap LA Case Study | Zublo",
    description:
      "How Zublo built a family discovery platform helping LA parents find kids activities in under 3 minutes — 2,000+ users and 15% return rate in 3 months.",
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        articleJsonLd({
          path: "/case-study-playmap-la/",
          headline: "PlayMap LA Case Study",
          description:
            "Family discovery platform with local filters, AI day planning, and SEO-driven growth for Los Angeles parents.",
          datePublished: "2026-01-01",
        }),
      ],
    },
  },
  "case-study-shirokin.html": {
    path: "/case-study-shirokin/",
    title: "Shirokin Shochu Launch Case Study | Zublo",
    description:
      "How Zublo introduced Shochu to India with infographic-led product education, brand storytelling, and +15% sales in 15 days.",
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        organizationJsonLd,
        websiteJsonLd,
        articleJsonLd({
          path: "/case-study-shirokin/",
          headline: "Shirokin Shochu Launch Case Study",
          description:
            "Visual, infographic-led product page that turned curiosity into confidence and lifted sales 15% in 15 days.",
        }),
      ],
    },
  },
};

export const ninetyDaysSeo = {
  path: "/90-days/",
  title: "Free Business Growth Audit | Get 3 Growth Ideas | Zublo",
  description:
    "Enter your website and get 3 tailored growth opportunities covering SEO, conversion, content, and customer acquisition.",
};
