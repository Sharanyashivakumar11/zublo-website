import type { BreadcrumbItem } from "@/data/site-breadcrumbs";

type SiteBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function SiteBreadcrumbs({ items }: SiteBreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumbs-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                className="breadcrumbs-item"
                aria-current={isLast ? "page" : undefined}
              >
                {item.href && !isLast ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
