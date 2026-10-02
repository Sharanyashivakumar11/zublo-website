import { BrushAccent } from "@/components/site/BrushDefs";
import { ctaLinks } from "@/data/cta-links";
import { finalCtaContent } from "@/data/page-content";

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <h2 className="cta-title">
          {finalCtaContent.headline}
          <BrushAccent color="brush-white" />
        </h2>
        <p className="cta-subtitle">
          Your competitors aren&apos;t smarter. They&apos;re just easier to find. Let&apos;s fix
          that.
        </p>
        <div className="final-cta-actions">
          <a href="#free-audit" className="btn btn-primary btn-large">
            Get My 3 Free Ideas
          </a>
          <a href={ctaLinks.bookCall} className="btn btn-secondary btn-large">
            Book a 15-min call
          </a>
        </div>
      </div>
    </section>
  );
}
