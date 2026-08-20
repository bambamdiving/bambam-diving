import ArticleFilters from "@/components/ArticleFilters";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Articles | BamBam Diving",
  description: "Dive stories, dive sites, and marine life from around the world.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        The Log
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Articles
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        Explore the best spots, from local reefs to faraway oceans.
      </p>
      <ArticleFilters articles={articles} />
    </div>
  );
}
