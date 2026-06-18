import { BrushUnderline } from "@/components/site/BrushDefs";

const sampleIdeas = [
  {
    label: "Fix #1 — Google Maps",
    title: "You're invisible for your best money keywords",
    body: "You rank on page 2 for \"Botox near me\" while competitors with worse reviews show up first. We'd optimize your GBP categories, add service-specific posts, and build location pages for each treatment.",
  },
  {
    label: "Fix #2 — Website conversion",
    title: "Your booking button is buried",
    body: "It takes 3 clicks to book on mobile. We'd add a sticky \"Book Now\" bar, simplify the hero CTA, and add trust signals (reviews + before/after) above the fold.",
  },
  {
    label: "Quick win — Do this week",
    title: "Turn your last 5 Google reviews into Instagram posts",
    body: "You have great reviews sitting idle. We'd turn each into a branded graphic and post one per day — free social proof that builds trust before people even visit your site.",
  },
];

export function AuditSampleMockup() {
  return (
    <section className="ninety-days-sample" id="sample-audit">
      <div className="container">
        <p className="ninety-days-eyebrow">What you&apos;ll actually get</p>
        <h2 className="section-title">
          Not a 40-page PDF. A reply you can use today.
          <BrushUnderline color="brush-lime" />
        </h2>
        <p className="ninety-days-section-lead">
          Here&apos;s what a real mini audit looks like — specific, practical, and written for
          your business (not a template).
        </p>

        <div className="audit-mockup">
          <div className="audit-mockup-chrome">
            <span className="audit-mockup-dot" />
            <span className="audit-mockup-dot" />
            <span className="audit-mockup-dot" />
            <span className="audit-mockup-label">From: Zublo · To: you@business.com</span>
          </div>
          <div className="audit-mockup-body">
            <p className="audit-mockup-subject">
              <strong>Subject:</strong> 3 ideas for Sunrise Med Spa — from your mini audit
            </p>
            <p className="audit-mockup-greeting">
              Hi Sarah — we looked at your website, Google profile, and Instagram. Here&apos;s
              what we&apos;d tackle first:
            </p>
            <div className="audit-mockup-ideas">
              {sampleIdeas.map((idea) => (
                <article key={idea.label} className="audit-mockup-idea">
                  <p className="audit-mockup-idea-label">{idea.label}</p>
                  <h3>{idea.title}</h3>
                  <p>{idea.body}</p>
                </article>
              ))}
            </div>
            <p className="audit-mockup-signoff">
              Want us to build any of this? Reply to this email or book a 15-min call — no
              pressure.
            </p>
          </div>
        </div>

        <p className="audit-mockup-caption">
          Example for a med spa. Yours will be tailored to your industry and what we find.
        </p>
      </div>
    </section>
  );
}
