"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

const TAGS: { label: string; color: string }[] = [
  { label: "Sharks", color: "#FF6900" },
  { label: "Sunfish", color: "#2FA7AD" },
  { label: "Cave Diving", color: "#191D32" },
  { label: "Turtles", color: "#15687A" },
  { label: "Crayfish", color: "#E05F00" },
  { label: "The Environment", color: "#2E8B57" },
];

export default function ArticleFilters({ articles }: { articles: ArticleMeta[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filtered =
    selected.length === 0
      ? articles
      : articles.filter((a) => a.tags?.some((t) => selected.includes(t)));

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-12">
        {TAGS.map((tag) => {
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

      {filtered.length === 0 ? (
        <p className="text-ink-dim">No articles tagged with that yet &mdash; check back soon.</p>
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
