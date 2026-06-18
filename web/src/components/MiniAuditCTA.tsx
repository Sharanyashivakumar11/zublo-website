import { BrushHighlight } from "@/components/site/BrushDefs";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { miniAuditContent } from "@/data/page-content";

const deliverables = [
  "3 specific fixes we'd make first",
  "Where you're losing customers online",
  "One quick win you can do this week",
];

export function MiniAuditCTA() {
  return (
    <section className="white-label ninety-days-audit" id="free-audit">
      <div className="container">
        <div className="white-label-content ninety-days-audit-layout">
          <div className="white-label-text">
            <p className="ninety-days-eyebrow ninety-days-eyebrow-dark">Free mini audit</p>
            <h2>
              {miniAuditContent.headline}
              <BrushHighlight color="brush-pink" />
            </h2>
            <p className="lead">{miniAuditContent.copy}</p>
            <ul className="benefits-list lead-deliverables">
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="ninety-days-audit-note">
              Seriously — no fog machine. Just 3 ideas you can actually use.
            </p>
          </div>
          <div className="lead-form-container">
            <h3>Get your 3 ideas</h3>
            <p className="lead-form-intro">Takes 30 seconds. We reply within a few hours.</p>
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>
  );
}
