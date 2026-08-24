"use client";

import { useState } from "react";
import WorldMap, { type MapPin } from "./WorldMap";
import { ALL_TAGS } from "@/lib/tags";

const FALLBACK_COLOR = "#2F6778";

export default function MapView({
  pins,
  tagCountries,
  initialAuthed = false,
}: {
  pins: MapPin[];
  tagCountries: string[];
  initialAuthed?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {tagCountries.map((country) => {
          const color = ALL_TAGS.find((t) => t.label === country)?.color ?? FALLBACK_COLOR;
          return (
            <button
              key={country}
              onClick={() => setActive(country)}
              className="font-body font-medium text-white rounded-full text-sm px-4 py-2 transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
            >
              {country}
            </button>
          );
        })}
      </div>

      <WorldMap pins={pins} active={active} onActiveChange={setActive} initialAuthed={initialAuthed} />
    </>
  );
}
