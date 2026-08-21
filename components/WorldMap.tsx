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
  const activePin = pins.find((p) => p.country === active);

  return (
    <div>
      <div className="relative aspect-[1774/887] w-full rounded-xl overflow-hidden border border-line">
        <Image src="/map/world-map.png" alt="World map" fill className="object-cover" priority />

        {pins.map((pin) => (
          <button
            key={pin.country}
            onMouseEnter={() => setActive(pin.country)}
            onClick={() => setActive(pin.country)}
            aria-label={`Articles in ${pin.country}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-buoy border-2 border-white shadow-lg"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span className="absolute inset-0 rounded-full bg-buoy animate-ping opacity-60" />
          </button>
        ))}
      </div>

      <div className="mt-6 border border-line rounded-xl bg-white p-6 min-h-[92px]">
        {activePin ? (
          <>
            <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-3">
              {activePin.country}
            </p>
            <ul className="space-y-2">
              {activePin.articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="text-ink hover:text-teal transition-colors"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-ink-dim text-sm">Hover or tap a pin to see the articles from there.</p>
        )}
      </div>
    </div>
  );
}
