import { footerContent } from "@/data/page-content";
import { siteNav } from "@/data/site-nav";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-warm-white px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <a href={siteNav.home} className="font-display text-2xl font-bold text-ink">
            Zublo
          </a>
          <p className="mt-3 max-w-sm text-sm text-ink/70">{footerContent.tagline}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-ink">Services</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`${siteNav.services}#websites`} className="text-ink/70 hover:text-ink">
                  Websites
                </a>
              </li>
              <li>
                <a href={`${siteNav.services}#seo`} className="text-ink/70 hover:text-ink">
                  SEO
                </a>
              </li>
              <li>
                <a href={`${siteNav.services}#content`} className="text-ink/70 hover:text-ink">
                  Content
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink">Company</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={siteNav.work} className="text-ink/70 hover:text-ink">
                  Work
                </a>
              </li>
              <li>
                <a href={siteNav.ninetyDays} className="font-semibold text-ink">
                  90 Days
                </a>
              </li>
              <li>
                <a href={siteNav.contact} className="text-ink/70 hover:text-ink">
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-ink/10 pt-6">
        <p className="text-sm text-ink/50">
          &copy; {new Date().getFullYear()} Smarter Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
