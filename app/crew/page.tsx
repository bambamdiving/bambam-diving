import CrewGrid from "@/components/CrewGrid";

export const metadata = {
  title: "Us | BamBam Diving",
  description: "The people behind BamBam Diving.",
};

const crew = [
  {
    name: "Adam Hart",
    role: "",
    bio: "Adam is happiest when exploring the world beneath the waves. He started scuba diving at just 12 years old and has spent much of his life chasing new underwater experiences. From reef systems to wrecks, Adam’s curiosity and respect for the ocean drive him to share its beauty with others.",
  },
  {
    name: "Youssef Sammour",
    role: "",
    bio: "Youssef combines his love of freediving with a strong dedication to humanitarian causes. His connection to the ocean is about more than adventure, it reflects his belief in balance, resilience, and community. Whether in the water or working on projects that create positive change, Youssef brings passion and purpose to everything he does.",
  },
  {
    name: "Camilo Garcia",
    role: "Owner of Divers Underground",
    bio: "Where others see a map, he sees a portal to another world. Camilo lives to discover what lies beyond the known path, whether it’s a trail through the jungle, a passage underground, or a new adventure waiting to unfold. Warm, curious, and full of humour, he’s the kind of person who makes every day feel like the beginning of something exciting.",
  },
  {
    name: "Scott Macindoe",
    role: "President NZ Sport Fishing Council, LegaSea Support",
    bio: "Scott Macindoe’s passion is to make certain that the vision of ‘more fish in the water for future generations’ is not something that we just talk about – he is totally committed to this becoming our reality.",
  },
];

export default function CrewPage() {
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

      <CrewGrid crew={crew} />
    </div>
  );
}
