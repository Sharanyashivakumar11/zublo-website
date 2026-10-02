import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const outDir = join(webRoot, "out");
const siteRoot = join(webRoot, "..");

if (!existsSync(outDir)) {
  console.error("Missing out/ — run `npm run build` first.");
  process.exit(1);
}

for (const name of readdirSync(outDir)) {
  const from = join(outDir, name);
  const to = join(siteRoot, name);
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  console.log(`Copied ${from} → ${to}`);
}

console.log("Done. Site exported with clean folder URLs.");
