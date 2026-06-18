export type MethodStep = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

export const methodSteps: MethodStep[] = [
  {
    id: "website",
    label: "Website",
    description:
      "A fast, clear site that tells visitors exactly what you do and why they should trust you.",
    icon: "🌐",
  },
  {
    id: "local-seo",
    label: "Local SEO",
    description:
      "Pages and structure built so the right people find you when they search in your area.",
    icon: "🔍",
  },
  {
    id: "google-maps",
    label: "Google Maps",
    description:
      "A polished Google Business Profile that shows up, gets clicks, and drives foot traffic.",
    icon: "📍",
  },
  {
    id: "reviews",
    label: "Reviews",
    description:
      "Simple systems that turn happy customers into visible proof — without awkward begging.",
    icon: "⭐",
  },
  {
    id: "content",
    label: "Content",
    description:
      "Useful posts, photos, and pages that answer real questions and keep you top of mind.",
    icon: "📝",
  },
  {
    id: "leads",
    label: "Leads",
    description:
      "Forms, offers, and follow-ups designed to capture interest before it disappears.",
    icon: "📬",
  },
  {
    id: "customers",
    label: "Customers",
    description:
      "The whole system working together so more visitors become booked appointments and sales.",
    icon: "🎯",
  },
];

export const methodContent = {
  headline: "Our growth recipe is simple.",
  subheadline: "No mystery. No 47-slide deck. Just a system that actually connects.",
};
