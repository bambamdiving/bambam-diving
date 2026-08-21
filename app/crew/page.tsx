import Link from "next/link";
import Image from "next/image";
import CrewGrid from "@/components/CrewGrid";
import { crew } from "@/lib/crew";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Us | BamBam Diving",
  description: "The people behind BamBam Diving.",
};

export default function CrewPage() {
  const articles = getAllArticles();
  const crewWithArticles = crew.map((member) => ({
    ...member,
    articlesHref: articles.some((a) => a.contributor === member.name)
      ? `/articles?contributor=${encodeURIComponent(member.name)}`
      : undefined,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 pb-16 sm:pb-20">
      <div className="bg-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="font-display text-xl text-ink">
            Got a Story to Add?
          </h2>
          <p className="text-ink-dim text-sm">
            We&rsquo;d love to have you join the crew.
          </p>
        </div>
        <Link
          href="/become-a-contributor"
          className="shrink-0 font-body text-sm font-medium bg-teal hover:bg-teal-deep text-white px-6 py-3 rounded-full transition-colors"
        >
          Get Published
        </Link>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-8">
        Us
      </h1>

      <CrewGrid crew={crewWithArticles} />

      <div className="mt-16 pt-12 border-t border-line">
        <h2 className="font-display text-2xl text-ink mb-8">
          Honourable Mentions
        </h2>
        <div className="flex items-center gap-4">
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white border border-line overflow-hidden shrink-0">
            <Image
              src="/logos/deep-dive-dubai.png"
              alt="Deep Dive Dubai"
              fill
              className="object-contain p-2"
            />
          </span>
          <div>
            <p className="font-display text-lg text-ink">Deep Dive Dubai</p>
            <p className="text-ink-dim text-sm">
              <a
                href="https://www.deepdivedubai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-buoy transition-colors"
              >
                deepdivedubai.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
