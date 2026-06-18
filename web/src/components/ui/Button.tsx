import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  external?: boolean;
};

const variantStyles = {
  primary:
    "bg-ink text-warm-white border-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-sm",
  secondary:
    "bg-accent-orange text-warm-white border-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-sm",
  outline:
    "bg-warm-white text-ink border-ink shadow-brutal hover:-translate-y-0.5 hover:bg-sky-blue/30 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-sm",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg border-[3px] px-6 py-3 text-base font-bold transition-all duration-200",
    variantStyles[variant],
    className,
  );

  if (external || href.startsWith("http") || href.endsWith(".html")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external || href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
