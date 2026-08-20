"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function track(type: "pageview" | "click", path: string, target?: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, path, target }),
    keepalive: true,
  }).catch(() => {
    // Swallow errors - analytics should never break the site.
  });
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    track("pageview", pathname);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href) return;
      const isOutbound = /^https?:\/\//.test(href) && !href.includes("bambamdiving.com");
      const isCta = el.dataset.track === "cta";
      if (isOutbound || isCta) {
        track("click", pathname, href);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
