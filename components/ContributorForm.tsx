"use client";

import { useState } from "react";
import TermsModal from "./TermsModal";

const FORM_ENDPOINT = "https://formspree.io/f/xwlejdgk";

const labelClass = "font-body text-sm font-medium text-ink-dim";
const inputClass =
  "mt-1 w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none";

function YesNoField({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 flex items-center gap-6">
        <label className="flex items-center gap-2 text-ink">
          <input type="radio" name={name} value="Yes" required className="accent-buoy" />
          Yes
        </label>
        <label className="flex items-center gap-2 text-ink">
          <input type="radio" name={name} value="No" required className="accent-buoy" />
          No
        </label>
      </div>
    </div>
  );
}

export default function ContributorForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [termsOpen, setTermsOpen] = useState(false);

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
      <input type="hidden" name="_subject" value="New Get Published submission" />

      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="instagram" className={labelClass}>
          Instagram Handle
        </label>
        <input id="instagram" name="instagram" type="text" className={inputClass} />
      </div>

      <div>
        <label htmlFor="country" className={labelClass}>
          Country of Residence
        </label>
        <input id="country" name="country" type="text" className={inputClass} />
      </div>

      <YesNoField name="original_work" label="Is this your own original work?" />

      <div>
        <label htmlFor="published_elsewhere" className={labelClass}>
          Has it been published anywhere else? If so, where?
        </label>
        <input
          id="published_elsewhere"
          name="published_elsewhere"
          type="text"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="content_goal" className={labelClass}>
          What is the main message or goal for the content?
        </label>
        <textarea
          id="content_goal"
          name="content_goal"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <YesNoField
        name="promotes_business"
        label="Does your content promote any products, services or businesses?"
      />

      <div>
        <label htmlFor="media_link" className={labelClass}>
          Link to Images and Video
        </label>
        <input
          id="media_link"
          name="media_link"
          type="url"
          placeholder="Google Drive, Dropbox, YouTube..."
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-dim">
        <input
          type="checkbox"
          name="agree_terms"
          value="Yes"
          required
          className="mt-1 accent-buoy"
        />
        <span>
          I have read and agree to the{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setTermsOpen(true);
            }}
            className="text-teal hover:text-buoy underline transition-colors"
          >
            Terms and Conditions
          </button>
        </span>
      </label>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />

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
