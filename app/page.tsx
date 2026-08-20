import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getFeaturedArticles } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticles();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/iKWel-IRPko?autoplay=1&mute=1&loop=1&playlist=iKWel-IRPko&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
            title="BamBam Diving background video"
            allow="autoplay; encrypted-media"
            frameBorder={0}
          />
          <div className="absolute inset-0 bg-navy/20" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36 text-center">
          <p className="font-gauge text-white/80 text-xs tracking-[0.2em] uppercase mb-5 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            Real dives. Real footage. Real stories.
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
            The World&rsquo;s Best
            <br />
            <span className="text-buoy">Dive Site</span>
          </h1>
          <p className="mt-4 font-body text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            *probably not the world&rsquo;s best dive site
          </p>
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
