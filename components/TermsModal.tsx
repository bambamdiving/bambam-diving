"use client";

export default function TermsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-5"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-dim hover:text-buoy transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="font-body text-ink-dim leading-relaxed [&_h2]:font-display [&_h2]:text-ink [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_h3]:font-body [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1 [&_em]:block [&_em]:not-italic [&_em]:text-xs [&_em]:uppercase [&_em]:tracking-[0.1em] [&_em]:text-buoy [&_em]:mb-4">
          <h2>Terms and Conditions for Video Submission</h2>
          <em>Effective from date of submission</em>
          <p>
            By submitting your video content to BamBam Diving (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;), you (&ldquo;you&rdquo; or &ldquo;Contributor&rdquo;) agree to the
            following Terms and Conditions. Please read them carefully before uploading or sending
            any video footage.
          </p>

          <h3>1. Consent to Publish</h3>
          <p>
            By submitting Content to us, you grant us a worldwide, non-exclusive, royalty-free,
            transferable license to use, reproduce, distribute, publicly display, and publish the
            Content on our YouTube channel(s), website(s), social media accounts, and other
            associated digital platforms.
          </p>
          <p>You confirm that:</p>
          <ul>
            <li>You are the sole creator and/or legal owner of the Content or have full rights and permission to submit it.</li>
            <li>Your submission does not infringe any third-party rights, including copyright, privacy, or publicity rights.</li>
          </ul>

          <h3>2. Use of Branding</h3>
          <p>You consent to us adding our logo, watermark, or any other form of branding to your Content.</p>

          <h3>3. Consent to Edit</h3>
          <p>You grant us permission to edit, crop, merge, subtitle, or modify your Content in any way necessary for publication.</p>

          <h3>4. Revenue Sharing</h3>
          <p>Revenue Split: 50% to you, 50% to us. Payments will be made on a bi-annually basis once revenue exceeds $100.00.</p>

          <h3>5. Termination and Removal</h3>
          <p>You may request removal of your Content by written request. We reserve the right to remove any Content at our discretion.</p>

          <h3>6. General</h3>
          <p>These Terms and Conditions constitute the entire agreement between you and us regarding your Content.</p>

          <h2>Article Submission Terms and Conditions</h2>

          <h3>1. Ownership and Rights</h3>
          <p>
            You affirm that the Submission is your original work and does not infringe on any
            third-party rights. By submitting your article, you grant BamBam Diving a
            non-exclusive, royalty-free license to publish and display the work.
          </p>

          <h3>2. Editing and Formatting</h3>
          <p>We may edit for clarity, grammar, formatting, and style.</p>

          <h3>3. Publication and Removal</h3>
          <p>Submission does not guarantee publication. We may remove articles at any time.</p>

          <h3>4. Disclosure and Ethics</h3>
          <p>Sponsored or promotional content must be disclosed.</p>

          <h3>5. Compensation</h3>
          <p>No payment unless agreed in writing.</p>

          <h3>6. Indemnity</h3>
          <p>You agree to indemnify and hold us harmless from claims relating to your submission.</p>

          <h3>7. Privacy</h3>
          <p>We may store your contact info for editorial purposes only.</p>

          <h3>8. Governing Law</h3>
          <p>These terms are governed by the laws of the sea.</p>
        </div>
      </div>
    </div>
  );
}
