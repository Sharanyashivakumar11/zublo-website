import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assetFiles, imageDirs, legacyFlatPages, staticPages } from "./site-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const siteRoot = join(webRoot, "..");
const publicDir = join(webRoot, "public");

mkdirSync(publicDir, { recursive: true });

for (const file of legacyFlatPages) {
  const legacyPath = join(publicDir, file);
  if (existsSync(legacyPath)) {
    rmSync(legacyPath, { force: true });
    console.log(`Removed legacy public/${file}`);
  }
}

for (const { file, publicPath } of staticPages) {
  const from = join(siteRoot, file);
  if (!existsSync(from)) {
    console.warn(`Skipping missing ${from}`);
    continue;
  }
  const to = join(publicDir, publicPath);
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`Copied ${file} → public/${publicPath}`);
}

for (const file of assetFiles) {
  const from = join(siteRoot, file);
  if (!existsSync(from)) {
    console.warn(`Skipping missing ${from}`);
    continue;
  }
  copyFileSync(from, join(publicDir, file));
  console.log(`Copied ${file} → public/${file}`);
}

for (const dir of imageDirs) {
  const from = join(siteRoot, dir);
  if (!existsSync(from)) {
    console.warn(`Skipping missing ${from}`);
    continue;
  }
  const to = join(publicDir, dir);
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  console.log(`Copied ${dir}/ → public/${dir}/`);
}

console.log("Static pages synced for local dev.");
