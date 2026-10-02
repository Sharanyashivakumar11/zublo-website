import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { linkReplacements } from "./site-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(__dirname, "..", "..");

function normalizeHtml(html) {
  let out = html;

  for (const [from, to] of linkReplacements) {
    out = out.replaceAll(`href="${from}`, `href="${to}`);
  }

  out = out.replace(/href="styles\.css([^"]*)"/g, 'href="/styles.css$1"');
  out = out.replace(/src="script\.js([^"]*)"/g, 'src="/script.js$1"');
  out = out.replace(/src="images\//g, 'src="/images/');

  return out;
}

const htmlFiles = readdirSync(siteRoot).filter((name) => name.endsWith(".html"));

for (const file of htmlFiles) {
  const filePath = join(siteRoot, file);
  const normalized = normalizeHtml(readFileSync(filePath, "utf8"));
  writeFileSync(filePath, normalized);
  console.log(`Normalized links: ${file}`);
}

console.log("Static HTML links and asset paths normalized.");
