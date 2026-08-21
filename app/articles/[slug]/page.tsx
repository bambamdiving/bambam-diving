import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllSlugs,
  getArticleBySlug,
  markdownToHtml,
} from "@/lib/articles";
import { findContributor } from "@/lib/contributors";
import DiveLog from "@/components/DiveLog";
import TagPills from "@/components/TagPills";
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
  const contributor = findContributor(article.contributor);

  return (
    <article>
      <div className="relative h-64 sm:h-80 w-full">
        {article.coverImage ? (
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
        ) : (
          <UnderwaterPanel className="h-full w-full" tone="teal" />
        )}
      </div>
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <Link
          href="/articles"
          className="font-body text-sm text-ink-dim hover:text-teal transition-colors"
        >
          &larr; All Articles
        </Link>

        <div className="mt-6 mb-4">
          <TagPills tags={article.tags} />
        </div>
        <h1 className="font-modern font-extrabold text-4xl sm:text-5xl text-ink leading-tight mb-6">
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
          className="mt-10 font-body text-lg leading-relaxed text-ink-dim [&_h2]:font-modern [&_h2]:font-bold [&_h2]:text-ink [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-5 [&_em]:text-ink-dim"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {contributor && (
          <div className="mt-14 pt-8 border-t border-line flex items-start gap-4">
            <span className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-teal">
              {contributor.photo && (
                <Image src={contributor.photo} alt={contributor.name} fill className="object-cover" />
              )}
            </span>
            <div>
              <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-1">
                Written by
              </p>
              <p className="font-display text-lg text-ink">{contributor.name}</p>
              {contributor.bio && (
                <p className="text-ink-dim text-sm leading-relaxed mt-1">{contributor.bio}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
