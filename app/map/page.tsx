export const metadata = {
  title: "Map | BamBam Diving",
  description: "Every dive site logged so far, in one place.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Where We&rsquo;ve Been
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Map
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        Every dive site will get pinned here soon &mdash; for now, here&rsquo;s the world waiting to be marked up.
      </p>

      <div className="rounded-xl border border-line overflow-hidden bg-panel">
        <svg viewBox="0 0 1000 500" className="w-full h-auto" role="img" aria-label="World map placeholder">
          <rect width="1000" height="500" fill="var(--color-panel)" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`lat-${i}`} x1="0" x2="1000" y1={(i + 1) * 50} y2={(i + 1) * 50} stroke="var(--color-line)" strokeWidth="1" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`lon-${i}`} y1="0" y2="500" x1={(i + 1) * 83.33} x2={(i + 1) * 83.33} stroke="var(--color-line)" strokeWidth="1" />
          ))}

          <g fill="var(--color-teal)" opacity="0.9">
            <ellipse cx="150" cy="120" rx="85" ry="55" />
            <ellipse cx="230" cy="90" rx="45" ry="30" />
            <ellipse cx="120" cy="70" rx="35" ry="25" />

            <ellipse cx="230" cy="290" rx="45" ry="90" />
            <ellipse cx="255" cy="230" rx="30" ry="35" />

            <ellipse cx="480" cy="105" rx="45" ry="35" />

            <ellipse cx="500" cy="230" rx="55" ry="95" />
            <ellipse cx="470" cy="180" rx="35" ry="30" />

            <ellipse cx="650" cy="130" rx="110" ry="75" />
            <ellipse cx="760" cy="200" rx="60" ry="60" />
            <ellipse cx="700" cy="230" rx="50" ry="50" />

            <ellipse cx="850" cy="360" rx="65" ry="40" />
          </g>
        </svg>
      </div>
      <p className="text-ink-dim text-sm mt-4 text-center">
        Pins for each dive site are coming &mdash; this is just the backdrop for now.
      </p>
    </div>
  );
}
