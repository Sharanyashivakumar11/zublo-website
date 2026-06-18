import Script from "next/script";
import { AuditSampleMockup } from "@/components/AuditSampleMockup";
import { BookCallSection } from "@/components/BookCallSection";
import { BrushDefs } from "@/components/site/BrushDefs";
import { FinalCTA } from "@/components/FinalCTA";
import { HeroSection } from "@/components/HeroSection";
import { IndustryCards } from "@/components/IndustryCards";
import { MiniAuditCTA } from "@/components/MiniAuditCTA";
import { ProblemSection } from "@/components/ProblemSection";
import { SiteBreadcrumbs } from "@/components/site/SiteBreadcrumbs";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SocialProof } from "@/components/SocialProof";
import { StickyLeadBar } from "@/components/StickyLeadBar";
import { WhyZublo } from "@/components/WhyZublo";
import { ZubloMethod } from "@/components/ZubloMethod";
import { ninetyDaysBreadcrumbs } from "@/data/site-breadcrumbs";

export default function NinetyDaysPage() {
  return (
    <>
      <BrushDefs />
      <SiteHeader activeNav="ninetyDays" />
      <SiteBreadcrumbs items={ninetyDaysBreadcrumbs} />
      <main>
        <HeroSection />
        <ProblemSection />
        <IndustryCards />
        <ZubloMethod />
        <MiniAuditCTA />
        <AuditSampleMockup />
        <SocialProof />
        <BookCallSection />
        <WhyZublo />
        <FinalCTA />
      </main>
      <StickyLeadBar />
      <SiteFooter />
      <Script src="/script.js?v=4" strategy="afterInteractive" />
    </>
  );
}
