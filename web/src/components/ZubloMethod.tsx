import { BrushUnderline } from "@/components/site/BrushDefs";
import { methodContent, methodSteps } from "@/data/method";

export function ZubloMethod() {
  return (
    <section className="proof ninety-days-method" id="method">
      <div className="container">
        <h2 className="section-title">
          {methodContent.headline}
          <BrushUnderline color="brush-pink" />
        </h2>
        <p className="ninety-days-section-lead">{methodContent.subheadline}</p>

        <div className="method-flow" aria-hidden>
          {methodSteps.map((step, index) => (
            <span key={step.id} className="method-flow-item">
              <span className="method-flow-icon">{step.icon}</span>
              <span className="method-flow-label">{step.label}</span>
              {index < methodSteps.length - 1 && (
                <span className="method-flow-arrow">→</span>
              )}
            </span>
          ))}
        </div>

        <div className="services-grid method-grid">
          {methodSteps.map((step, index) => (
            <article key={step.id} className="service-card method-step-card">
              <div className="service-icon">{step.icon}</div>
              <p className="method-step-number">Step {index + 1}</p>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
