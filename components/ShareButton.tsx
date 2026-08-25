"use client";

import { useState } from "react";

export default function ShareButton({
  title,
  text,
  className = "",
}: {
  title: string;
  text?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // User cancelled the share sheet - nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable - nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 font-body text-sm font-medium text-ink-dim hover:text-teal transition-colors ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" strokeLinecap="round" />
      </svg>
      {copied ? "Link copied!" : "Share"}
    </button>
  );
}
