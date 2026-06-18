import { BrushUnderline } from "@/components/site/BrushDefs";
import { industries } from "@/data/industries";

const defaultIndustryId = industries[0].id;

export function IndustryCards() {
  return (
    <section className="services-preview ninety-days-industries" id="industries">
      <div className="container">
        <p className="ninety-days-eyebrow">Pick your industry</p>
        <h2 className="section-title">
          If we ran your business for 90 days, here&apos;s what we&apos;d do.
          <BrushUnderline color="brush-blue" />
        </h2>
        <p className="ninety-days-section-lead">
          One proven system — customized for how your customers actually decide. Pick your
          industry (or agency model) below.
        </p>

        <div className="industry-tabs">
          <div className="industry-tab-list" role="tablist" aria-label="Industries">
            {industries.map((industry) => {
              const isActive = industry.id === defaultIndustryId;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  id={`industry-tab-${industry.id}`}
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${industry.id}`}
                  className={`industry-tab${isActive ? " is-active" : ""}`}
                  data-industry-tab={industry.id}
                >
                  <span className="industry-tab-icon" aria-hidden>
                    {industry.icon}
                  </span>
                  <span className="industry-tab-label">{industry.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {industries.map((industry) => {
            const isActive = industry.id === defaultIndustryId;
            return (
              <article
                key={industry.id}
                id={`industry-panel-${industry.id}`}
                role="tabpanel"
                aria-labelledby={`industry-tab-${industry.id}`}
                className="service-card industry-card industry-tab-panel"
                hidden={!isActive}
                data-industry-panel={industry.id}
              >
                <div className="service-icon">{industry.icon}</div>
                <h3>{industry.title}</h3>
                <p>{industry.opening}</p>
                <ul className="benefits-list industry-bullets">
                  {industry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="hidden-opportunity">
                  <p className="hidden-opportunity-label">Hidden opportunity</p>
                  <p>{industry.hiddenOpportunity}</p>
                </div>
                <button
                  type="button"
                  className="service-link industry-cta"
                  data-industry-short-name={industry.shortName}
                >
                  {industry.id === "white-label"
                    ? "Get partnership ideas →"
                    : `Get ideas for my ${industry.shortName.toLowerCase()} →`}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
