import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  pageSeo,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_ALT,
} from "./seo-config.mjs";
import { staticPages } from "./site-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(__dirname, "..", "..");
const publicDir = join(__dirname, "..", "public");

function buildSeoBlock({ path, title, description, type = "website", jsonLd }) {
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const lines = [
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}">`,
    `    <meta name="robots" content="index, follow">`,
    `    <link rel="icon" href="/favicon.svg" type="image/svg+xml">`,
    `    <link rel="icon" href="/favicon.ico" sizes="any">`,
    `    <link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
    `    <link rel="canonical" href="${canonical}">`,
    `    <meta property="og:title" content="${title}">`,
    `    <meta property="og:description" content="${description}">`,
    `    <meta property="og:url" content="${canonical}">`,
    `    <meta property="og:site_name" content="Zublo">`,
    `    <meta property="og:type" content="${type}">`,
    `    <meta property="og:image" content="${DEFAULT_OG_IMAGE}">`,
    `    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}">`,
    `    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}">`,
    `    <meta property="og:image:alt" content="${OG_IMAGE_ALT}">`,
    `    <meta property="og:image:type" content="image/png">`,
    `    <meta name="twitter:card" content="summary_large_image">`,
    `    <meta name="twitter:title" content="${title}">`,
    `    <meta name="twitter:description" content="${description}">`,
    `    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}">`,
  ];

  if (jsonLd) {
    lines.push(
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    );
  }

  return lines.join("\n");
}

function applySeoToFile(filePath, seo) {
  let html = readFileSync(filePath, "utf8");
  const seoBlock = buildSeoBlock(seo);

  html = html.replace(/    <script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, "");

  const seoHeadPattern =
    /    <title>[\s\S]*?<meta name="twitter:image" content="[^"]*">(?:\s*<meta property="og:image:[^"]+" content="[^"]*">)*/;

  if (seoHeadPattern.test(html)) {
    html = html.replace(seoHeadPattern, seoBlock);
  } else {
    html = html.replace(/    <title>[\s\S]*?<\/title>/, seoBlock);
  }

  writeFileSync(filePath, html);
  console.log(`Updated SEO: ${filePath}`);
}

for (const { file, publicPath } of staticPages) {
  const seo = pageSeo[file];
  if (!seo) continue;

  applySeoToFile(join(siteRoot, file), seo);
  applySeoToFile(join(publicDir, publicPath), seo);
}

console.log("SEO tags applied to static HTML pages.");
