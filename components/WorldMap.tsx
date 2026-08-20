"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type MapPin = {
  country: string;
  x: number;
  y: number;
  articles: { slug: string; title: string }[];
};

export default function WorldMap({ pins }: { pins: MapPin[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative aspect-[1774/887] w-full rounded-xl overflow-hidden border border-line">
      <Image src="/map/world-map.png" alt="World map" fill className="object-cover" priority />

      {pins.map((pin) => (
        <div
          key={pin.country}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          onMouseEnter={() => setActive(pin.country)}
          onMouseLeave={() => setActive((cur) => (cur === pin.country ? null : cur))}
        >
          <button
            onClick={() => setActive((cur) => (cur === pin.country ? null : pin.country))}
            aria-label={`Articles in ${pin.country}`}
            className="relative flex items-center justify-center w-5 h-5 rounded-full bg-buoy border-2 border-white shadow-lg"
          >
            <span className="absolute inset-0 rounded-full bg-buoy animate-ping opacity-60" />
          </button>

          {active === pin.country && (
            <div className="absolute z-10 top-6 left-1/2 -translate-x-1/2 w-56 bg-white rounded-lg shadow-xl border border-line p-4 text-left">
              <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-2">
                {pin.country}
              </p>
              <ul className="space-y-1.5">
                {pin.articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="text-sm text-ink hover:text-teal transition-colors"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
