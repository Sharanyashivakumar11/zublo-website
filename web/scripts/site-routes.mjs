/** Canonical routes for static HTML pages (source file → public path → URL path). */
export const staticPages = [
  { file: "index.html", publicPath: "index.html", path: "/" },
  { file: "services.html", publicPath: "services/index.html", path: "/services/" },
  { file: "work.html", publicPath: "work/index.html", path: "/work/" },
  { file: "contact.html", publicPath: "contact/index.html", path: "/contact/" },
  {
    file: "case-study-ate.html",
    publicPath: "case-study-ate/index.html",
    path: "/case-study-ate/",
  },
  {
    file: "case-study-content-systems.html",
    publicPath: "case-study-content-systems/index.html",
    path: "/case-study-content-systems/",
  },
  {
    file: "case-study-ruthuparna.html",
    publicPath: "case-study-ruthuparna/index.html",
    path: "/case-study-ruthuparna/",
  },
  {
    file: "case-study-playmap-la.html",
    publicPath: "case-study-playmap-la/index.html",
    path: "/case-study-playmap-la/",
  },
  {
    file: "case-study-shirokin.html",
    publicPath: "case-study-shirokin/index.html",
    path: "/case-study-shirokin/",
  },
];

/** Legacy flat .html files removed after folder-based deploy. */
export const legacyFlatPages = staticPages
  .filter((p) => p.file !== "index.html")
  .map((p) => p.file);

/** Internal link rewrites (longest match first). */
export const linkReplacements = [
  ["case-study-playmap-la.html", "/case-study-playmap-la/"],
  ["case-study-content-systems.html", "/case-study-content-systems/"],
  ["case-study-ruthuparna.html", "/case-study-ruthuparna/"],
  ["case-study-shirokin.html", "/case-study-shirokin/"],
  ["case-study-ate.html", "/case-study-ate/"],
  ["services.html", "/services/"],
  ["work.html", "/work/"],
  ["contact.html", "/contact/"],
  ["index.html", "/"],
  ["90-days/", "/90-days/"],
];

export const assetFiles = [
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "zublo-logo.svg",
  "og-image.png",
  "favicon.svg",
  "favicon.ico",
  "apple-touch-icon.png",
];

/** Image directories copied into public/ for local dev and static export. */
export const imageDirs = ["images"];
