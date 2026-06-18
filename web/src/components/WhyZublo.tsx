import { BrushUnderline } from "@/components/site/BrushDefs";
import { whyZubloContent } from "@/data/page-content";

const bulletIcons = ["🎯", "⚡", "📍", "🧲", "📋", "🤝"];

export function WhyZublo() {
  return (
    <section className="services-preview ninety-days-why" id="why-zublo">
      <div className="container">
        <p className="ninety-days-eyebrow">Why Zublo</p>
        <h2 className="section-title">
          {whyZubloContent.headline}
          <BrushUnderline color="brush-orange" />
        </h2>
        <p className="ninety-days-section-lead">
          We&apos;re not a 40-person agency with a fancy lobby and a 6-week onboarding call.
          We&apos;re a small studio that moves fast, thinks like operators, and builds things
          that actually convert.
        </p>
        <div className="services-grid why-zublo-grid">
          {whyZubloContent.bullets.map((bullet, index) => (
            <div key={bullet} className="service-card why-zublo-card">
              <div className="service-icon">{bulletIcons[index % bulletIcons.length]}</div>
              <h3>{bullet}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
