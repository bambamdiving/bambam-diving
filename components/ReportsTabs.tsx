"use client";

import { useState } from "react";

export default function ReportsTabs({
  website,
  meta,
  logoutAction,
}: {
  website: React.ReactNode;
  meta: React.ReactNode;
  logoutAction: () => Promise<void>;
}) {
  const [tab, setTab] = useState<"website" | "meta">("website");

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display text-3xl text-ink">Reports</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="font-gauge text-xs tracking-[0.15em] uppercase text-ink-dim hover:text-buoy"
          >
            Log out
          </button>
        </form>
      </div>

      <div className="flex gap-2 mb-10">
        <button
          type="button"
          onClick={() => setTab("website")}
          className={`font-display text-sm tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-colors ${
            tab === "website" ? "bg-buoy text-white" : "bg-panel text-ink-dim hover:text-buoy"
          }`}
        >
          Website
        </button>
        <button
          type="button"
          onClick={() => setTab("meta")}
          className={`font-display text-sm tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-colors ${
            tab === "meta" ? "bg-buoy text-white" : "bg-panel text-ink-dim hover:text-buoy"
          }`}
        >
          Meta
        </button>
      </div>

      {tab === "website" ? website : meta}
    </div>
  );
}
