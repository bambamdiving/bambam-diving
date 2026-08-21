"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchableArticle } from "@/lib/articles";
import { SUBJECT_TAGS, LOCATION_TAGS } from "@/lib/tags";
import ArticleCard from "./ArticleCard";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export default function ArticleFilters({ articles }: { articles: SearchableArticle[] }) {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [contributor, setContributor] = useState<string | null>(
    searchParams.get("contributor")
  );

  function toggle(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const q = query.trim().toLowerCase();

  const filtered = articles.filter((a) => {
    const matchesContributor = !contributor || a.contributor === contributor;
    const matchesTags = selected.length === 0 || a.tags?.some((t) => selected.includes(t));
    const matchesQuery =
      q.length === 0 ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.categories.some((c) => c.toLowerCase().includes(q)) ||
      a.tags?.some((t) => t.toLowerCase().includes(q));
    return matchesContributor && matchesTags && matchesQuery;
  });

  return (
    <div>
      {contributor && (
        <div className="flex items-center gap-2 mb-6">
          <span className="font-body text-sm text-ink-dim">
            Showing articles by <strong className="text-ink">{contributor}</strong>
          </span>
          <button
            onClick={() => setContributor(null)}
            className="font-body text-sm text-teal hover:text-buoy transition-colors"
          >
            Clear &times;
          </button>
        </div>
      )}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-3">
          {SUBJECT_TAGS.map((tag) => {
            const active = selected.includes(tag.label);
            return (
              <button
                key={tag.label}
                onClick={() => toggle(tag.label)}
                className={`font-body text-sm font-medium px-4 py-2 rounded-full text-white shadow-sm transition-all ${
                  active ? "ring-2 ring-white ring-offset-2 ring-offset-navy/25" : "opacity-90 hover:opacity-100"
                }`}
                style={{ backgroundColor: tag.color }}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search articles"
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
              className={`font-body text-sm font-medium px-4 py-2 rounded-full text-white shadow-sm transition-all ${
                active ? "ring-2 ring-white ring-offset-2 ring-offset-navy/25" : "opacity-90 hover:opacity-100"
              }`}
              style={{ backgroundColor: tag.color }}
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
          placeholder="Search articles..."
          className="w-full mb-8 bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none"
        />
      )}

      {filtered.length === 0 ? (
        <p className="text-ink-dim">Nothing matches yet &mdash; try a different tag or search term.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {filtered.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
