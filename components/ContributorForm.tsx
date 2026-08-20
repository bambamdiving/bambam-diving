"use client";

import { useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function ContributorForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-teal/40 bg-panel rounded-xl p-8 text-center">
        <p className="font-display text-xl text-teal mb-2">Got it.</p>
        <p className="text-ink-dim">
          Your submission is in. We&rsquo;ll be in touch if it&rsquo;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-body text-sm font-medium text-ink-dim">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-body text-sm font-medium text-ink-dim">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none"
        />
      </div>
      <div>
        <label htmlFor="location" className="font-body text-sm font-medium text-ink-dim">
          Dive Site / Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          className="mt-1 w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none"
        />
      </div>
      <div>
        <label htmlFor="story" className="font-body text-sm font-medium text-ink-dim">
          Tell us about the dive
        </label>
        <textarea
          id="story"
          name="story"
          required
          rows={6}
          className="mt-1 w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-body text-sm font-medium bg-buoy hover:bg-buoy-dim disabled:opacity-60 text-white px-6 py-3 rounded-full transition-colors"
      >
        {status === "sending" ? "Sending..." : "Submit"}
      </button>
      {status === "error" && (
        <p className="text-buoy text-sm">
          Something went wrong sending that &mdash; mind trying again?
        </p>
      )}
    </form>
  );
}
