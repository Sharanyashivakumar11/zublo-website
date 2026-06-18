export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const ninetyDaysBreadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "90 Days" },
];

export const servicesBreadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Services" },
];

export const workBreadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Work" },
];

export const contactBreadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Contact" },
];
