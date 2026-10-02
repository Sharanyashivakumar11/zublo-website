import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Los Angeles Web Design, SEO & Growth Marketing | Zublo",
  description:
    "Zublo is a Los Angeles digital marketing studio helping businesses launch websites, improve SEO, and grow with practical marketing systems in as little as 20 days.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
