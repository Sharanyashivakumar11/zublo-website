import type { NextConfig } from "next";
import { staticPages } from "./scripts/site-routes.mjs";

/** Dev-only: map clean URLs to static HTML in /public (ignored during static export). */
function devStaticRewrites() {
  return staticPages.flatMap(({ path, publicPath }) => {
    const destination = `/${publicPath}`;
    if (path === "/") {
      return [{ source: "/", destination }];
    }
    const slug = path.replace(/\/$/, "");
    return [
      { source: slug, destination },
      { source: path, destination },
    ];
  });
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return devStaticRewrites();
  },
};

export default nextConfig;
