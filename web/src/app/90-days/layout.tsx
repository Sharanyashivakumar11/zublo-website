import type { Metadata } from "next";
import Script from "next/script";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createPageMetadata,
  ninetyDaysDescription,
  ninetyDaysTitle,
  ninetyDaysWebPageJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: ninetyDaysTitle,
  description: ninetyDaysDescription,
  path: "/90-days/",
});

const ninetyDaysJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd, ninetyDaysWebPageJsonLd],
};

export default function NinetyDaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={ninetyDaysJsonLd} />
      <link rel="stylesheet" href="/styles.css?v=5" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-V1R92FETBJ"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V1R92FETBJ');
        `}
      </Script>
    </>
  );
}
