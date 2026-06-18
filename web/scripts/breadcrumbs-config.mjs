/** Breadcrumb trails: last item is current page (no href). */
export const pageBreadcrumbs = {
  "services.html": [
    { label: "Home", href: "/" },
    { label: "Services" },
  ],
  "work.html": [
    { label: "Home", href: "/" },
    { label: "Work" },
  ],
  "contact.html": [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ],
  "case-study-playmap-la.html": [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "PlayMap LA" },
  ],
  "case-study-shirokin.html": [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "Shirokin" },
  ],
  "case-study-ate.html": [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "ATE" },
  ],
  "case-study-content-systems.html": [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "Content Systems" },
  ],
  "case-study-ruthuparna.html": [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "Ruthuparna Sharma Workshop" },
  ],
};

export const ninetyDaysBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "90 Days" },
];

export function buildBreadcrumbHtml(items) {
  const listItems = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      if (item.href && !isLast) {
        return `                <li class="breadcrumbs-item"><a href="${item.href}">${item.label}</a></li>`;
      }
      return `                <li class="breadcrumbs-item" aria-current="page"><span>${item.label}</span></li>`;
    })
    .join("\n");

  return `    <nav class="breadcrumbs" aria-label="Breadcrumb">
        <div class="container">
            <ol class="breadcrumbs-list">
${listItems}
            </ol>
        </div>
    </nav>`;
}
