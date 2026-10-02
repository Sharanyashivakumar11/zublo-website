"use client";

import { BrushHighlight } from "@/components/site/BrushDefs";
import { CalendlyEmbed, openCalendlyPopup } from "@/components/CalendlyEmbed";
import { calendlyUrl, contactInfo, ctaLinks } from "@/data/cta-links";

export function BookCallSection() {
  const hasCalendly = Boolean(calendlyUrl);

  const copy = (
    <div className="book-call-copy why-fast-text">
      <p className="ninety-days-eyebrow">Ready to talk now?</p>
      <h2>
        Skip the back-and-forth. Book 15 minutes.
        <BrushHighlight color="brush-lime" />
      </h2>
      <p className="lead">
        Already know you want help? Pick a time and we&apos;ll walk through what we&apos;d fix in
        your first 90 days — website, Google, reviews, and conversion.
      </p>
      <ul className="benefits-list book-call-points">
        <li>15 minutes, no pitch deck</li>
        <li>Founder-led — not a sales rep</li>
        <li>Leave with 1–2 clear next steps</li>
      </ul>

      <div className="book-call-actions">
        {hasCalendly ? (
          <button
            type="button"
            className="btn btn-primary btn-large"
            onClick={() => openCalendlyPopup(calendlyUrl)}
          >
            Book a call
          </button>
        ) : (
          <a href={contactInfo.phoneHref} className="btn btn-primary btn-large">
            Call now
          </a>
        )}
        <a href={ctaLinks.freeAudit} className="btn btn-secondary btn-large">
          Get 3 free ideas instead
        </a>
      </div>

      <p className="book-call-alt">
        {hasCalendly ? (
          <>
            Or call <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a> ·{" "}
            <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a>
          </>
        ) : (
          <>
            Call or text during business hours (PT):{" "}
            <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a> ·{" "}
            <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a>
          </>
        )}
      </p>
    </div>
  );

  return (
    <section className="why-fast ninety-days-book-call" id="book-call">
      <div className="container">
        {hasCalendly ? (
          <div className="book-call-layout">
            {copy}
            <div className="book-call-embed">
              <CalendlyEmbed url={calendlyUrl} />
            </div>
          </div>
        ) : (
          <div className="why-fast-content">{copy}</div>
        )}
      </div>
    </section>
  );
}
