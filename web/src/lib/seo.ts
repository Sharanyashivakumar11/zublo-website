import type { Metadata } from "next";

export const SITE_URL = "https://zublo.co";
export const SITE_NAME = "Zublo";
export const OG_IMAGE_PATH = "/og-image.png";
export const DEFAULT_OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  "Zublo — LA digital marketing for websites, SEO, and growth";

export const siteIcons = {
  icon: [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon.ico", sizes: "any" },
  ],
  apple: "/apple-touch-icon.png",
};

export const defaultDescription =
  "Zublo is a Los Angeles digital marketing studio helping businesses launch websites, improve SEO, and grow with practical marketing systems in as little as 20 days.";

export const ninetyDaysDescription =
  "Enter your website and get 3 tailored growth opportunities covering SEO, conversion, content, and customer acquisition.";

export const ninetyDaysTitle =
  "Free Business Growth Audit | Get 3 Growth Ideas | Zublo";

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function createPageMetadata({
  title,
  description = defaultDescription,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}: {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    icons: siteIcons,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: ogImage,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": organizationId,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_OG_IMAGE,
  email: "contact@zublo.co",
  description: defaultDescription,
  areaServed: {
    "@type": "City",
    name: "Los Angeles",
  },
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

export const ninetyDaysWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/90-days/#webpage`,
  name: "Free Business Growth Audit | Get 3 Growth Ideas",
  description: ninetyDaysDescription,
  url: `${SITE_URL}/90-days/`,
  isPartOf: { "@id": websiteId },
  about: { "@id": organizationId },
  inLanguage: "en-US",
  mainEntity: {
    "@type": "Offer",
    name: "3 Tailored Growth Opportunities",
    description: ninetyDaysDescription,
    price: "0",
    priceCurrency: "USD",
    offeredBy: { "@id": organizationId },
    areaServed: { "@type": "City", name: "Los Angeles" },
  },
};
