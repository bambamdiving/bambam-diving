import Link from "next/link";
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
      ? "/articles"
      : undefined,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Who&rsquo;s Behind This
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Us
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        The divers, photographers, and mates who make the trips happen. Tap a name for their story.
      </p>

      <CrewGrid crew={crewWithArticles} />

      <div className="mt-16 pt-12 border-t border-line text-center">
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-3">
          Got a Story to Add?
        </h2>
        <p className="text-ink-dim max-w-xl mx-auto mb-6">
          If you&rsquo;ve got a dive worth writing up, we&rsquo;d love to have you join the crew.
        </p>
        <Link
          href="/become-a-contributor"
          className="font-body text-sm font-medium bg-teal hover:bg-teal-deep text-white px-6 py-3 rounded-full transition-colors inline-block"
        >
          Get Published
        </Link>
      </div>
    </div>
  );
}
