"use client";

import Link from "next/link";
import Image from "next/image";
import TagPills from "./TagPills";

export type MapPin = {
  country: string;
  x: number;
  y: number;
  articles: {
    slug: string;
    title: string;
    tags: string[];
    contributorName?: string;
    contributorPhoto?: string;
  }[];
};

export default function WorldMap({
  pins,
  active,
  onActiveChange,
}: {
  pins: MapPin[];
  active: string | null;
  onActiveChange: (country: string | null) => void;
}) {
  const activePin = pins.find((p) => p.country === active);

  return (
    <>
      <div className="relative aspect-[1774/887] w-full rounded-xl overflow-hidden border border-line">
        <Image src="/map/world-map.png" alt="World map" fill className="object-cover" priority />

        {pins.map((pin) => (
          <button
            key={pin.country}
            onClick={() => onActiveChange(pin.country)}
            aria-label={`Articles in ${pin.country}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-buoy border-2 border-white shadow-lg hover:scale-125 transition-transform"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span className="absolute inset-0 rounded-full bg-buoy animate-ping opacity-60" />
          </button>
        ))}
      </div>

      {activePin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-5"
          onClick={() => onActiveChange(null)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onActiveChange(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-ink-dim hover:text-buoy transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>

            <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-4">
              {activePin.country}
            </p>

            <ul className="space-y-4">
              {activePin.articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-teal">
                      {a.contributorPhoto && (
                        <Image
                          src={a.contributorPhoto}
                          alt={a.contributorName ?? ""}
                          fill
                          className="object-cover"
                        />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-ink group-hover:text-teal transition-colors truncate">
                        {a.title}
                      </span>
                      <span className="block mt-1">
                        <TagPills tags={a.tags} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
