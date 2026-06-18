export type Industry = {
  id: string;
  title: string;
  shortName: string;
  tabLabel: string;
  icon: string;
  accent: string;
  opening: string;
  bullets: string[];
  hiddenOpportunity: string;
};

export const industries: Industry[] = [
  {
    id: "med-spa",
    title: "If We Ran Your Med Spa…",
    shortName: "Med Spa",
    tabLabel: "Med Spa",
    icon: "✨",
    accent: "from-pink-lavender/60 to-soft-blush",
    opening:
      "First, we'd Google you. If your competitors show up before you, they're quietly sending you a thank-you card.",
    bullets: [
      "Build treatment pages for Botox, filler, facials, lasers, and skin concerns",
      "Create a Treatment Matchmaker quiz",
      "Improve Google Maps visibility",
      "Set up review request flows after appointments",
      "Turn before-and-after content into lead magnets",
    ],
    hiddenOpportunity:
      "Most med spas market 3 treatments while quietly offering 30.",
  },
  {
    id: "dentist",
    title: "If We Ran Your Dental Practice…",
    shortName: "Dentist",
    tabLabel: "Dentist",
    icon: "🦷",
    accent: "from-sky-blue/70 to-accent-blue/30",
    opening: "We'd own every search a nervous patient makes at 11:30 PM.",
    bullets: [
      "Create pages for emergency dentist, Invisalign, whitening, implants, and cleanings",
      "Build FAQ pages around pain, cost, fear, and timelines",
      "Improve appointment booking flow",
      "Add trust-building staff and patient story sections",
      "Build a review engine",
    ],
    hiddenOpportunity:
      "Most dentists have patient trust offline but almost no proof online.",
  },
  {
    id: "daycare",
    title: "If We Ran Your Daycare…",
    shortName: "Daycare / Preschool",
    tabLabel: "Daycare",
    icon: "🧸",
    accent: "from-accent-lime/50 to-sky-blue/50",
    opening: "Parents don't buy childcare. They buy peace of mind.",
    bullets: [
      "Build a warm, trust-first website",
      "Add a 'Day in the Life' timeline",
      "Showcase teachers, safety, curriculum, meals, naps, and parent communication",
      "Create location-based SEO pages",
      "Add tour booking forms and parent FAQs",
    ],
    hiddenOpportunity:
      "Most daycare websites answer questions only after parents call. Yours should answer them before.",
  },
  {
    id: "restaurant",
    title: "If We Ran Your Restaurant…",
    shortName: "Restaurant / Cafe",
    tabLabel: "Restaurant",
    icon: "🍽️",
    accent: "from-accent-orange/40 to-accent-lime/40",
    opening:
      "We'd ask one question: how many people looked at your menu this week and never came in?",
    bullets: [
      "Make menu pages searchable",
      "Optimize Google Business Profile",
      "Create landing pages for brunch, catering, private events, and dietary options",
      "Capture emails for specials and repeat visits",
      "Turn signature dishes into content",
    ],
    hiddenOpportunity:
      "Restaurants spend hours plating food and 12 seconds showing it online.",
  },
  {
    id: "fitness",
    title: "If We Ran Your Fitness Studio…",
    shortName: "Fitness Studio",
    tabLabel: "Fitness",
    icon: "💪",
    accent: "from-deep-green/20 to-accent-lime/50",
    opening: "We'd stop selling classes and start selling outcomes.",
    bullets: [
      "Create pages for beginner classes, postpartum fitness, strength training, weight loss, and events",
      "Add first-class offers and intro packages",
      "Build testimonials around real transformations",
      "Improve local search visibility",
      "Create content around consistency and confidence",
    ],
    hiddenOpportunity:
      "People don't want a 45-minute class. They want to feel like themselves again.",
  },
  {
    id: "contractor",
    title: "If We Ran Your Contracting Business…",
    shortName: "Contractor / Home Services",
    tabLabel: "Contractor",
    icon: "🔨",
    accent: "from-accent-orange/30 to-sky-blue/50",
    opening: "Your best salesperson is probably buried in your camera roll.",
    bullets: [
      "Build project galleries and before-after pages",
      "Create city-specific service pages",
      "Add quote request funnels",
      "Improve Google Maps ranking",
      "Turn completed jobs into case studies",
    ],
    hiddenOpportunity:
      "Most contractors have proof of great work but no system to show it.",
  },
  {
    id: "white-label",
    title: "If We Ran Your Agency's White-Label Program…",
    shortName: "White-Label / Agency",
    tabLabel: "White-Label",
    icon: "🤝",
    accent: "from-soft-blush/70 to-pink-lavender/50",
    opening:
      "We'd stop you from turning down good clients because your team is maxed out.",
    bullets: [
      "Deliver websites, apps, SEO, and content under your brand",
      "Set up a repeatable intake → delivery → handoff workflow",
      "Build proposal-ready scopes and timelines you can trust",
      "Keep quality consistent without hiring full-time specialists",
      "Turn overflow work into margin — not burnout",
    ],
    hiddenOpportunity:
      "Most agencies say no to projects they could win — because delivery capacity is the bottleneck, not sales.",
  },
];
