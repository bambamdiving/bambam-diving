"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchableArticle } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import TagFilterLinks from "./TagFilterLinks";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [contributor, setContributor] = useState<string | null>(
    searchParams.get("contributor")
  );
  const [tag, setTag] = useState<string | null>(searchParams.get("tag"));

  const q = query.trim().toLowerCase();

  const filtered = articles.filter((a) => {
    const matchesContributor = !contributor || a.contributor === contributor;
    const matchesTag = !tag || a.tags?.includes(tag);
    const matchesQuery =
      q.length === 0 ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.categories.some((c) => c.toLowerCase().includes(q)) ||
      a.tags?.some((t) => t.toLowerCase().includes(q));
    return matchesContributor && matchesTag && matchesQuery;
  });

  return (
    <div>
      {(contributor || tag) && (
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {contributor && (
            <div className="flex items-center gap-2">
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
          {tag && (
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-ink-dim">
                Showing articles tagged <strong className="text-ink">{tag}</strong>
              </span>
              <button
                onClick={() => setTag(null)}
                className="font-body text-sm text-teal hover:text-buoy transition-colors"
              >
                Clear &times;
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search articles"
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-dim hover:text-buoy hover:border-buoy transition-colors"
        >
          <SearchIcon />
        </button>
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

      <div className="flex justify-center mt-10">
        <TagFilterLinks />
      </div>
    </div>
  );
}
