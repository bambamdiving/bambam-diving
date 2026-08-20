"use client";

import { useState } from "react";
import Image from "next/image";
import { SUBJECT_TAGS, LOCATION_TAGS } from "@/lib/tags";

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  videoUrl?: string;
  caption: string;
  location?: string;
  tags: string[];
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4.2 3.15A1 1 0 0 0 22 16v-8a1 1 0 0 0-1.6-.8L16 10.35V7a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);

  function toggle(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const q = query.trim().toLowerCase();
  const filtered = items.filter((item) => {
    const matchesTags = selected.length === 0 || item.tags.some((t) => selected.includes(t));
    const matchesQuery =
      q.length === 0 ||
      item.caption.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTags && matchesQuery;
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-3">
          {SUBJECT_TAGS.map((tag) => {
            const active = selected.includes(tag.label);
            return (
              <button
                key={tag.label}
                onClick={() => toggle(tag.label)}
                className="font-body text-sm font-medium px-4 py-2 rounded-full border transition-colors"
                style={
                  active
                    ? { backgroundColor: tag.color, borderColor: tag.color, color: "#fff" }
                    : { borderColor: tag.color, color: tag.color, backgroundColor: "transparent" }
                }
              >
                {tag.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search gallery"
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-dim hover:text-buoy hover:border-buoy transition-colors"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {LOCATION_TAGS.map((tag) => {
          const active = selected.includes(tag.label);
          return (
            <button
              key={tag.label}
              onClick={() => toggle(tag.label)}
              className="font-body text-sm font-medium px-4 py-2 rounded-full border transition-colors"
              style={
                active
                  ? { backgroundColor: tag.color, borderColor: tag.color, color: "#fff" }
                  : { borderColor: tag.color, color: tag.color, backgroundColor: "transparent" }
              }
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      {searchOpen && (
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the gallery..."
          className="w-full mb-8 bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none"
        />
      )}

      {filtered.length === 0 ? (
        <p className="text-ink-dim">
          Nothing here yet &mdash; photos and videos are on their way.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setOpenItem(item)}
              className="relative block aspect-square rounded-xl overflow-hidden border border-line group"
            >
              <Image src={item.src} alt={item.caption} fill className="object-cover group-hover:scale-105 transition-transform" />
              {item.type === "video" && (
                <span className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-navy/70 text-white">
                  <VideoIcon />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-5"
          onClick={() => setOpenItem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenItem(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-ink-dim hover:text-buoy transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
            <div className="relative aspect-video bg-navy">
              {openItem.type === "video" && openItem.videoUrl ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={openItem.videoUrl}
                  title={openItem.caption}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image src={openItem.src} alt={openItem.caption} fill className="object-contain" />
              )}
            </div>
            <div className="p-6">
              {openItem.location && (
                <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-2">
                  {openItem.location}
                </p>
              )}
              <p className="text-ink-dim leading-relaxed">{openItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
