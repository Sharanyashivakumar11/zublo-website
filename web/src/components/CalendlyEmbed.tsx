"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type CalendlyEmbedProps = {
  url: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!url || !containerRef.current || !window.Calendly || initializedRef.current) return;

    initializedRef.current = true;
    window.Calendly.initInlineWidget({
      url,
      parentElement: containerRef.current,
      resize: true,
    });
  }, [url]);

  if (!url) return null;

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (!containerRef.current || !window.Calendly || initializedRef.current) return;
          initializedRef.current = true;
          window.Calendly.initInlineWidget({
            url,
            parentElement: containerRef.current,
            resize: true,
          });
        }}
      />
      <div ref={containerRef} className="calendly-embed-host" />
    </>
  );
}

export function openCalendlyPopup(url: string) {
  if (!url) return;

  const init = () => window.Calendly?.initPopupWidget({ url });

  if (window.Calendly) {
    init();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://assets.calendly.com/assets/external/widget.js"]',
  );

  if (existing) {
    existing.addEventListener("load", init, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = init;
  document.body.appendChild(script);
}
