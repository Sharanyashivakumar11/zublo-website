import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildBreadcrumbHtml, pageBreadcrumbs } from "./breadcrumbs-config.mjs";
import { staticPages } from "./site-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(__dirname, "..", "..");
const publicDir = join(__dirname, "..", "public");

function stripExistingNavigation(html) {
  return html
    .replace(/    <a href="\/work\/" class="back-link"[\s\S]*?<\/a>\n?/g, "")
    .replace(/    <nav class="breadcrumbs"[\s\S]*?<\/nav>\n?/g, "");
}

function applyBreadcrumbsToFile(filePath, items) {
  let html = readFileSync(filePath, "utf8");
  html = stripExistingNavigation(html);
  const breadcrumbBlock = buildBreadcrumbHtml(items);

  if (!html.includes('<section class="page-hero')) {
    console.warn(`No page-hero found in ${filePath}`);
    return;
  }

  html = html.replace(/(\s*<section class="page-hero)/, `\n${breadcrumbBlock}\n$1`);
  writeFileSync(filePath, html);
  console.log(`Updated breadcrumbs: ${filePath}`);
}

for (const { file, publicPath } of staticPages) {
  const items = pageBreadcrumbs[file];
  if (!items) continue;

  applyBreadcrumbsToFile(join(siteRoot, file), items);
  applyBreadcrumbsToFile(join(publicDir, publicPath), items);
}

console.log("Breadcrumbs applied to static HTML pages.");
