import { readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(__dirname, "..", "..");
const publicDir = join(__dirname, "..", "public");
const svgPath = join(siteRoot, "images", "og-image.svg");
const pngName = "og-image.png";
const svg = readFileSync(svgPath);

mkdirSync(publicDir, { recursive: true });

for (const outPath of [join(siteRoot, pngName), join(publicDir, pngName)]) {
  await sharp(svg).resize(1200, 630).png().toFile(outPath);
  console.log(`Generated ${outPath}`);
}
