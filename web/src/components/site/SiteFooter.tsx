import { siteNav } from "@/data/site-nav";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href={siteNav.home} className="logo-link">
              <svg
                className="logo-img"
                width="140"
                height="40"
                viewBox="0 0 140 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="28"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fontSize="32"
                  fontWeight="800"
                  fill="#100908"
                  letterSpacing="-0.5px"
                >
                  Z
                </text>
                <text
                  x="24"
                  y="28"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fontSize="32"
                  fontWeight="600"
                  fill="#100908"
                  letterSpacing="-0.5px"
                >
                  ublo
                </text>
                <line x1="22" y1="34" x2="78" y2="34" stroke="#E57236" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </a>
            <p>Websites, apps, and growth systems for LA businesses.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <a href={`${siteNav.services}#websites`}>Websites</a>
              <a href={`${siteNav.services}#apps`}>Apps</a>
              <a href={`${siteNav.services}#seo`}>SEO</a>
              <a href={`${siteNav.services}#content`}>Content</a>
              <a href={`${siteNav.services}#white-label`}>White-Label</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href={siteNav.work}>Work</a>
              <a href={siteNav.ninetyDays}>90 Days</a>
              <a href={siteNav.contact}>Let&apos;s Talk</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Smarter Marketing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
