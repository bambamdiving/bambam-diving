import { crew } from "./crew";

export type Contributor = {
  name: string;
  photo?: string;
  bio?: string;
  role?: string;
};

const organizations: Contributor[] = [
  {
    name: "Deep Dive Dubai",
    photo: "/logos/deep-dive-dubai.png",
  },
];

export function findContributor(name?: string): Contributor | undefined {
  if (!name) return undefined;
  return crew.find((c) => c.name === name) ?? organizations.find((o) => o.name === name);
}
