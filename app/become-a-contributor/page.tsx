import ContributorForm from "@/components/ContributorForm";

export const metadata = {
  title: "Get Published | BamBam Diving",
  description: "Got a dive story worth telling? Send it our way.",
};

export default function ContributorPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16 sm:py-20">
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-8">
        Got a Story?
      </h1>
      <ContributorForm />
    </div>
  );
}
