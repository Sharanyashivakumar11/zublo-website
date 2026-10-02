"use client";

import { useEffect, useState } from "react";

export function StickyLeadBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const auditSection = document.getElementById("free-audit");
    if (!auditSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" },
    );

    observer.observe(auditSection);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-lead-bar" role="region" aria-label="Quick lead capture">
      <p>Get 3 free ideas for your business</p>
      <a href="#free-audit" className="btn btn-primary">
        Start free audit
      </a>
    </div>
  );
}
