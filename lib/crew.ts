export type CrewMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  instagram?: string;
  website?: string;
};

export const crew: CrewMember[] = [
  {
    name: "Adam Hart",
    role: "",
    bio: "Adam is happiest when exploring the world beneath the waves. He started scuba diving at just 12 years old and has spent much of his life chasing new underwater experiences. From reef systems to wrecks, Adam’s curiosity and respect for the ocean drive him to share its beauty with others.",
    instagram: "https://www.instagram.com/mradamhart/",
  },
  {
    name: "Youssef Sammour",
    role: "",
    bio: "Youssef combines his love of freediving with a strong dedication to humanitarian causes. His connection to the ocean is about more than adventure, it reflects his belief in balance, resilience, and community. Whether in the water or working on projects that create positive change, Youssef brings passion and purpose to everything he does.",
    instagram: "https://www.instagram.com/yousontheloose/",
  },
  {
    name: "Camilo Garcia",
    role: "Owner of Divers Underground",
    bio: "Where others see a map, he sees a portal to another world. Camilo lives to discover what lies beyond the known path, whether it’s a trail through the jungle, a passage underground, or a new adventure waiting to unfold. Warm, curious, and full of humour, he’s the kind of person who makes every day feel like the beginning of something exciting.",
    instagram: "https://www.instagram.com/diversunderground/",
    website: "https://www.diversunderground.com/",
  },
  {
    name: "Scott Macindoe",
    role: "President NZ Sport Fishing Council, LegaSea Support",
    bio: "Scott Macindoe’s passion is to make certain that the vision of ‘more fish in the water for future generations’ is not something that we just talk about – he is totally committed to this becoming our reality.",
    instagram: "https://www.instagram.com/macindoescott/",
    website: "https://legasea.co.nz/",
  },
];
