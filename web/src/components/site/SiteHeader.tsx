import { siteNav, type SiteNavKey } from "@/data/site-nav";

type SiteHeaderProps = {
  activeNav?: SiteNavKey;
};

export function SiteHeader({ activeNav }: SiteHeaderProps) {
  return (
    <header className="header sticky">
      <div className="container">
        <div className="header-content">
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
                x="18"
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
          <button className="mobile-menu-toggle" aria-label="Toggle menu" id="mobileMenuToggle">
            <span />
            <span />
            <span />
          </button>
          <nav className="nav" id="mainNav">
            <a href={siteNav.home} className="nav-link">
              Home
            </a>
            <div className="nav-dropdown">
              <a href={siteNav.services} className="nav-link nav-link-dropdown">
                Services <span className="dropdown-arrow">▼</span>
              </a>
              <div className="dropdown-menu">
                <a href={`${siteNav.services}#websites`} className="dropdown-item">
                  Websites
                </a>
                <a href={`${siteNav.services}#apps`} className="dropdown-item">
                  Apps
                </a>
                <a href={`${siteNav.services}#seo`} className="dropdown-item">
                  SEO
                </a>
                <a href={`${siteNav.services}#content`} className="dropdown-item">
                  Content Systems
                </a>
                <a href={`${siteNav.services}#white-label`} className="dropdown-item">
                  White-Label
                </a>
                <a href={`${siteNav.services}#campaigns`} className="dropdown-item">
                  Campaigns
                </a>
              </div>
            </div>
            <a href={siteNav.work} className="nav-link">
              Work
            </a>
            <a
              href={siteNav.ninetyDays}
              className={activeNav === "ninetyDays" ? "nav-link nav-link-active" : "nav-link"}
              {...(activeNav === "ninetyDays" ? { "aria-current": "page" } : {})}
            >
              90 Days
            </a>
            <a href={siteNav.contact} className="nav-link cta-nav">
              Let&apos;s Talk
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
