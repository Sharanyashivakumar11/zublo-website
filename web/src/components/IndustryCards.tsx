"use client";

import { useState } from "react";
import { BrushUnderline } from "@/components/site/BrushDefs";
import { industries } from "@/data/industries";
import { setLeadFormIndustry } from "@/lib/lead-form-industry";

export function IndustryCards() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const active = industries.find((item) => item.id === activeId) ?? industries[0];

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
              const isActive = industry.id === activeId;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  id={`industry-tab-${industry.id}`}
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${industry.id}`}
                  className={`industry-tab${isActive ? " is-active" : ""}`}
                  onClick={() => setActiveId(industry.id)}
                >
                  <span className="industry-tab-icon" aria-hidden>
                    {industry.icon}
                  </span>
                  <span className="industry-tab-label">{industry.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <article
            key={active.id}
            id={`industry-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`industry-tab-${active.id}`}
            className="service-card industry-card industry-tab-panel"
          >
            <div className="service-icon">{active.icon}</div>
            <h3>{active.title}</h3>
            <p>{active.opening}</p>
            <ul className="benefits-list industry-bullets">
              {active.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="hidden-opportunity">
              <p className="hidden-opportunity-label">Hidden opportunity</p>
              <p>{active.hiddenOpportunity}</p>
            </div>
            <button
              type="button"
              className="service-link industry-cta"
              onClick={() => setLeadFormIndustry(active.shortName)}
            >
              {active.id === "white-label"
                ? "Get partnership ideas →"
                : `Get ideas for my ${active.shortName.toLowerCase()} →`}
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
