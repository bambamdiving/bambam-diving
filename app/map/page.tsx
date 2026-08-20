import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Map | BamBam Diving",
  description: "Every dive site logged so far, in one place.",
};

export default function MapPage() {
  const articles = getAllArticles().filter((a) => a.location && a.location !== "—");

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Where We&rsquo;ve Been
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Map
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        Every logged dive site, listed here for now &mdash; tell me to wire up an interactive
        map (Mapbox or Google Maps) once we&rsquo;re live and I&rsquo;ll plot these with pins.
      </p>

      <ul className="divide-y divide-line border-y border-line">
        {articles.map((a) => (
          <li key={a.slug} className="py-4 flex items-center justify-between gap-4 flex-wrap">
            <span className="font-gauge text-ink">{a.location}</span>
            <span className="font-body text-sm text-ink-dim">
              {a.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
