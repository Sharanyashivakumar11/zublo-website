"use client";

import { useEffect, useState } from "react";
import { GOOGLE_SCRIPT_URL } from "@/lib/form-endpoint";
import {
  getIndustryFromUrl,
  LEAD_FORM_INDUSTRY_EVENT,
} from "@/lib/lead-form-industry";
import { industries } from "@/data/industries";
import { contactInfo } from "@/data/cta-links";

type LeadCaptureFormProps = {
  defaultIndustry?: string;
};

export function LeadCaptureForm({ defaultIndustry = "" }: LeadCaptureFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [industry, setIndustry] = useState(() => {
    const fromUrl = getIndustryFromUrl();
    return fromUrl || defaultIndustry;
  });

  useEffect(() => {
    const syncFromUrl = () => {
      const fromUrl = getIndustryFromUrl();
      if (fromUrl) setIndustry(fromUrl);
    };

    const onIndustryEvent = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) setIndustry(detail);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener(LEAD_FORM_INDUSTRY_EVENT, onIndustryEvent);

    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener(LEAD_FORM_INDUSTRY_EVENT, onIndustryEvent);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const website = String(data.get("website") ?? "");
    const business = String(data.get("business") ?? "");
    const selectedIndustry = String(data.get("industry") ?? industry);

    const body = new URLSearchParams({
      name,
      email,
      business,
      service: "90-Day Mini Audit",
      message: [
        `Source: 90-days landing page`,
        `Industry: ${selectedIndustry || "Not specified"}`,
        `Website / Instagram: ${website}`,
      ].join("\n"),
    });

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body,
        mode: "no-cors",
      });
      setStatus("success");
      form.reset();
      setIndustry(getIndustryFromUrl());
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="lead-form-success">
        <p className="lead-form-success-title">You&apos;re in.</p>
        <p>
          We&apos;ll send your 3 ideas within a few hours. Check your inbox — and spam folder,
          just in case.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form lead-capture-form" onSubmit={handleSubmit}>
      {industry ? (
        <p className="lead-form-industry-note">
          Tailoring your ideas for <strong>{industry}</strong>
        </p>
      ) : null}
      <div className="lead-form-grid">
        <div className="form-group">
          <label htmlFor="lead-name">Name *</label>
          <input type="text" id="lead-name" name="name" required placeholder="Jane Smith" />
        </div>
        <div className="form-group">
          <label htmlFor="lead-email">Email *</label>
          <input type="email" id="lead-email" name="email" required placeholder="you@business.com" />
        </div>
        <div className="form-group">
          <label htmlFor="lead-website">Website or Instagram *</label>
          <input
            type="text"
            id="lead-website"
            name="website"
            required
            placeholder="yoursite.com or @yourhandle"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lead-business">Business name</label>
          <input type="text" id="lead-business" name="business" placeholder="Optional" />
        </div>
        <div className="form-group lead-form-full">
          <label htmlFor="lead-industry">Your industry</label>
          <select
            id="lead-industry"
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">Select one (optional)</option>
            {industries.map((item) => (
              <option key={item.id} value={item.shortName}>
                {item.shortName}
              </option>
            ))}
            <option value="Other local business">Other local business</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-large" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send My 3 Ideas"}
      </button>
      {status === "error" && (
        <p className="lead-form-error">
          Something went wrong. Email us at {contactInfo.emailDisplay} instead.
        </p>
      )}
      <p className="lead-form-fine-print">No spam. No sales call unless you want one. Unsubscribe anytime.</p>
    </form>
  );
}
