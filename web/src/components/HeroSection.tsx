import { BrushUnderline } from "@/components/site/BrushDefs";
import { ctaLinks } from "@/data/cta-links";
import { heroContent } from "@/data/page-content";

export function HeroSection() {
  return (
    <section className="page-hero ninety-days-hero">
      <div className="container">
        <p className="ninety-days-badge">90-day growth playbook</p>
        <h1 className="page-title ninety-days-title">
          {heroContent.headline}
          <BrushUnderline color="brush-orange" />
        </h1>
        <p className="ninety-days-subhead">{heroContent.subheadline}</p>
        <p className="ninety-days-microcopy">{heroContent.microcopy}</p>
        <div className="hero-ctas ninety-days-ctas">
          <div className="cta-with-consultation">
            <div className="doodled-arrow-wrapper">
              <svg className="doodled-arrow" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="10" x2="22" y2="10" stroke="#E57236" strokeWidth="3" strokeLinecap="round" />
                <path
                  d="M20,5 L25,10 L20,15"
                  stroke="#E57236"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <a href={heroContent.primaryCta.href} className="btn btn-primary">
              {heroContent.primaryCta.label}
            </a>
            <div className="free-consultation">
              <span className="hand-drawn-text">No fluff. Just a plan.</span>
            </div>
          </div>
          <a href={heroContent.secondaryCta.href} className="btn btn-secondary">
            {heroContent.secondaryCta.label}
          </a>
        </div>
        <p className="ninety-days-audience">{heroContent.audienceNote}</p>
        <p className="ninety-days-hero-alt">
          Already decided?{" "}
          <a href={ctaLinks.bookCall} className="ninety-days-inline-link">
            Book a 15-min call →
          </a>
        </p>
      </div>
    </section>
  );
}
