import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSlugs,
  getArticleBySlug,
  markdownToHtml,
} from "@/lib/articles";
import DiveLog from "@/components/DiveLog";
import UnderwaterPanel from "@/components/UnderwaterPanel";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const article = getArticleBySlug(slug);
    return {
      title: `${article.title} | BamBam Diving`,
      description: article.excerpt,
    };
  } catch {
    return { title: "Article | BamBam Diving" };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const contentHtml = await markdownToHtml(article.content);

  return (
    <article>
      <UnderwaterPanel className="h-64 sm:h-80 w-full" tone="teal" />
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <Link
          href="/articles"
          className="font-body text-sm text-ink-dim hover:text-teal transition-colors"
        >
          &larr; All Articles
        </Link>

        <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-buoy mt-6 mb-3">
          {article.categories.join(" · ")}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-6">
          {article.title}
        </h1>

        <DiveLog
          location={article.location}
          depth={article.depth}
          diveTime={article.diveTime}
          waterTemp={article.waterTemp}
          visibility={article.visibility}
        />

        {article.youtubeId && (
          <div className="mt-10 aspect-video w-full rounded-xl overflow-hidden border border-line">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${article.youtubeId}`}
              title={article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div
          className="mt-10 font-body text-lg leading-relaxed text-ink-dim [&_h2]:font-display [&_h2]:text-ink [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-5 [&_em]:text-ink-dim"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </article>
  );
}
