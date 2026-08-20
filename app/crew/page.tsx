import UnderwaterPanel from "@/components/UnderwaterPanel";

export const metadata = {
  title: "The Crew | BamBam Diving",
  description: "The people behind BamBam Diving.",
};

const crew = [
  {
    name: "Add your name here",
    role: "Founder / Diver",
    bio: "Tell me a bit about yourself and I'll write this bio properly \u2014 or send me your own words and I'll drop them straight in.",
  },
];

export default function CrewPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Who&rsquo;s Behind This
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        The Crew
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        The divers, photographers, and mates who make the trips happen.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {crew.map((member) => (
          <div key={member.name} className="border border-line rounded-xl bg-white shadow-sm overflow-hidden">
            <UnderwaterPanel className="h-28 w-full" tone="sand" />
            <div className="p-6">
              <h3 className="font-display text-xl text-ink">{member.name}</h3>
              <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-buoy mt-1 mb-3">
                {member.role}
              </p>
              <p className="text-ink-dim text-sm leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
