import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { crew } from "@/lib/crew";
import UnderwaterPanel from "./UnderwaterPanel";

const tones: Array<"teal" | "deep" | "sand"> = ["teal", "deep", "sand"];

export default function ArticleCard({
  article,
  index = 0,
}: {
  article: ArticleMeta;
  index?: number;
}) {
  const contributor = crew.find((c) => c.name === article.contributor);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block border border-line hover:border-buoy/60 rounded-xl overflow-hidden bg-white transition-colors shadow-sm hover:shadow-md"
    >
      <div className="relative">
        <UnderwaterPanel
          className="h-44 w-full"
          tone={tones[index % tones.length]}
        />
        <div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-white/90 flex items-center justify-center shadow-sm"
          title={contributor ? contributor.name : "Contributor coming soon"}
        >
          {contributor?.photo ? (
            <Image src={contributor.photo} alt={contributor.name} fill className="object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-ink-dim">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20c1.5-4 5-6 7.5-6s6 2 7.5 6" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
      <div className="p-6">
        <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-3">
          {article.categories.join(" · ")}
        </p>
        <h3 className="font-display text-xl sm:text-2xl text-ink group-hover:text-teal transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 text-ink-dim leading-relaxed">{article.excerpt}</p>
        <span className="mt-4 inline-block font-body text-sm font-medium text-teal group-hover:text-buoy transition-colors">
          Read more &rarr;
        </span>
      </div>
    </Link>
  );
}
