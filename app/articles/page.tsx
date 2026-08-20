import { Suspense } from "react";
import Image from "next/image";
import ArticleFilters from "@/components/ArticleFilters";
import { getAllArticlesWithContent } from "@/lib/articles";

export const metadata = {
  title: "Articles | BamBam Diving",
  description: "Dive stories, dive sites, and marine life from around the world.",
};

export default function ArticlesPage() {
  const articles = getAllArticlesWithContent();

  return (
    <div>
      <div className="relative h-56 sm:h-72 w-full overflow-hidden">
        <Image
          src="/articles-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/40" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
        <Suspense fallback={null}>
          <ArticleFilters articles={articles} />
        </Suspense>
      </div>
    </div>
  );
}
