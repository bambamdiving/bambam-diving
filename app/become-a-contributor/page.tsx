import ContributorForm from "@/components/ContributorForm";

export const metadata = {
  title: "Get Published | BamBam Diving",
  description: "Got a dive story worth telling? Send it our way.",
};

export default function ContributorPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Get Published
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Got a Story?
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        If you&rsquo;ve got a dive worth writing up &mdash; a great site, a wild encounter,
        a trip gone sideways in the best way &mdash; tell us about it below.
      </p>
      <ContributorForm />
    </div>
  );
}
