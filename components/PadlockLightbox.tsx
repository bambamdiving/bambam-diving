"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/reports/actions";

export default function PadlockLightbox() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await login(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
        setError(null);
        router.refresh();
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Reports (locked)"
        className="hidden sm:inline-flex transition-opacity hover:opacity-80 text-red-500"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M7 10V7a5 5 0 0 1 10 0v3" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-5"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-xs w-full p-8 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-ink-dim hover:text-buoy transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>

            <form action={handleSubmit} className="space-y-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-panel text-ink-dim mb-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M7 10V7a5 5 0 0 1 10 0v3" strokeLinecap="round" />
                </svg>
              </span>
              <h2 className="font-display text-2xl text-ink">Enter PIN</h2>
              <input
                type="password"
                name="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="&bull;&bull;&bull;&bull;"
                required
                autoFocus
                className="w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink text-center text-2xl tracking-[0.5em] outline-none"
              />
              <button
                type="submit"
                disabled={isPending}
                className="w-full font-display text-sm tracking-[0.1em] uppercase bg-buoy hover:bg-buoy-dim disabled:opacity-60 text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                {isPending ? "Checking..." : "Enter"}
              </button>
              {error && <p className="text-buoy text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
