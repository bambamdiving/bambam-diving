import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import UnderwaterPanel from "./UnderwaterPanel";

const tones: Array<"teal" | "deep" | "sand"> = ["teal", "deep", "sand"];

export default function ArticleCard({
  article,
  index = 0,
}: {
  article: ArticleMeta;
  index?: number;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block border border-line hover:border-buoy/60 rounded-xl overflow-hidden bg-white transition-colors shadow-sm hover:shadow-md"
    >
      <UnderwaterPanel
        className="h-44 w-full"
        tone={tones[index % tones.length]}
      />
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
