"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TagPills from "./TagPills";
import { verifyPin, savePinPosition } from "@/app/map/actions";

export type MapPin = {
  country: string;
  x: number;
  y: number;
  articles: {
    slug: string;
    title: string;
    tags: string[];
    coverImage?: string;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(
    () => Object.fromEntries(pins.map((p) => [p.country, { x: p.x, y: p.y }]))
  );
  const [editMode, setEditMode] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [pinPending, setPinPending] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const activePin = pins.find((p) => p.country === active);

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPinPending(true);
    setPinError(null);
    verifyPin(pinValue).then((result) => {
      setPinPending(false);
      if (result.error) {
        setPinError(result.error);
      } else {
        setEditMode(true);
        setShowPinPrompt(false);
        setPinValue("");
      }
    });
  }

  function handlePointerDown(country: string) {
    return (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!editMode) return;
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragStart.current = positions[country];
      setDragging(country);
      setSaveError(null);
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setPositions((prev) => ({ ...prev, [dragging]: { x, y } }));
  }

  function handlePointerUp() {
    if (!dragging) return;
    const country = dragging;
    const pos = positions[country];
    const fallback = dragStart.current;
    setDragging(null);
    savePinPosition(country, pos.x, pos.y).then((result) => {
      if (result.error && fallback) {
        setPositions((prev) => ({ ...prev, [country]: fallback }));
        setSaveError(result.error);
      }
    });
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative aspect-[1774/887] w-full rounded-xl overflow-hidden border border-line"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Image src="/map/world-map.png" alt="World map" fill className="object-cover" priority />

        {pins.map((pin) => {
          const pos = positions[pin.country] ?? { x: pin.x, y: pin.y };
          return (
            <button
              key={pin.country}
              onPointerDown={handlePointerDown(pin.country)}
              onClick={() => {
                if (!editMode) onActiveChange(pin.country);
              }}
              aria-label={`Articles in ${pin.country}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, touchAction: "none" }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-buoy border-2 border-white shadow-lg transition-transform ${
                editMode ? "cursor-grab active:cursor-grabbing hover:scale-110" : "hover:scale-125"
              }`}
            >
              {!editMode && (
                <span className="absolute inset-0 rounded-full bg-buoy animate-ping opacity-60" />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => (editMode ? setEditMode(false) : setShowPinPrompt((v) => !v))}
          aria-label={editMode ? "Done editing pin positions" : "Edit pin positions"}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-ink-dim hover:text-buoy shadow-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showPinPrompt && (
          <form
            onSubmit={handlePinSubmit}
            className="absolute top-14 right-3 bg-white rounded-xl shadow-lg border border-line p-4 flex flex-col gap-2 w-48"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pinValue}
              onChange={(e) => setPinValue(e.target.value)}
              placeholder="PIN"
              autoFocus
              className="border border-line rounded-lg px-3 py-2 text-center text-ink tracking-[0.3em] outline-none focus:border-buoy"
            />
            <button
              type="submit"
              disabled={pinPending}
              className="bg-buoy hover:bg-buoy-dim disabled:opacity-60 text-white text-sm font-medium rounded-lg py-2 transition-colors"
            >
              {pinPending ? "Checking..." : "Unlock editing"}
            </button>
            {pinError && <p className="text-buoy text-xs text-center">{pinError}</p>}
          </form>
        )}

        {editMode && (
          <div className="absolute bottom-3 left-3 bg-navy/80 text-white text-xs px-3 py-1.5 rounded-full">
            {saveError ? `Couldn't save: ${saveError}` : "Drag pins to reposition"}
          </div>
        )}
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
                    <span className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-teal">
                      {a.coverImage && (
                        <Image
                          src={a.coverImage}
                          alt={a.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      {a.contributorPhoto && (
                        <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white overflow-hidden bg-white/90">
                          <Image
                            src={a.contributorPhoto}
                            alt={a.contributorName ?? ""}
                            fill
                            className="object-cover"
                          />
                        </span>
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
