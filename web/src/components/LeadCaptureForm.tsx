import { industries } from "@/data/industries";

type LeadCaptureFormProps = {
  defaultIndustry?: string;
};

export function LeadCaptureForm({ defaultIndustry = "" }: LeadCaptureFormProps) {
  return (
    <form className="contact-form lead-capture-form" data-lead-capture-form>
      <p className="lead-form-industry-note" data-lead-industry-note hidden />
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
            defaultValue={defaultIndustry}
            data-lead-industry-select
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
      <button type="submit" className="btn btn-primary btn-large" data-lead-submit>
        Send My 3 Ideas
      </button>
      <p className="lead-form-error" data-lead-form-error hidden />
      <p className="lead-form-fine-print">
        No spam. No sales call unless you want one. Unsubscribe anytime.
      </p>
    </form>
  );
}
