import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import UnderwaterPanel from "@/components/UnderwaterPanel";
import { getFeaturedArticles } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticles();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <UnderwaterPanel className="absolute inset-0" tone="deep" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36 text-center">
          <p className="font-gauge text-white/80 text-xs tracking-[0.2em] uppercase mb-5">
            Real dives. Real footage. Real stories.
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white">
            The World&rsquo;s Best
            <br />
            <span className="text-buoy">Dive Site</span>
          </h1>
          <p className="mt-4 font-body text-white/70">
            *probably not the world&rsquo;s best dive site
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/articles"
              className="font-body text-sm font-medium bg-buoy hover:bg-buoy-dim text-white px-6 py-3 rounded-full transition-colors"
            >
              Read the Log
            </Link>
            <Link
              href="/gallery"
              className="font-body text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/40 px-6 py-3 rounded-full transition-colors backdrop-blur"
            >
              See the Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">
            Featured Articles
          </h2>
          <Link
            href="/articles"
            className="font-body text-sm font-medium text-teal hover:text-buoy transition-colors"
          >
            Show All &rarr;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {featured.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-3">
            From the Gallery
          </h2>
          <p className="text-ink-dim max-w-xl mx-auto mb-8">
            A running log of shots from the last few dives &mdash; curated straight from the source,
            no broken feed required.
          </p>
          <Link
            href="/gallery"
            className="font-body text-sm font-medium bg-buoy hover:bg-buoy-dim text-white px-6 py-3 rounded-full transition-colors inline-block"
          >
            Open Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
