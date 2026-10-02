export const LEAD_FORM_INDUSTRY_EVENT = "lead-form:industry";

export function getIndustryFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("industry") ?? "";
}

export function setLeadFormIndustry(shortName: string, scrollToForm = true) {
  const url = new URL(window.location.href);
  url.searchParams.set("industry", shortName);
  url.hash = "free-audit";
  window.history.replaceState(null, "", url);
  window.dispatchEvent(
    new CustomEvent<string>(LEAD_FORM_INDUSTRY_EVENT, { detail: shortName }),
  );

  if (scrollToForm) {
    document.getElementById("free-audit")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
