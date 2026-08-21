export type TagDef = { label: string; color: string };

export const SUBJECT_TAGS: TagDef[] = [
  { label: "Sharks", color: "#FF6900" },
  { label: "Sunfish", color: "#2FA7AD" },
  { label: "Cave Diving", color: "#191D32" },
  { label: "Turtles", color: "#15687A" },
  { label: "Crayfish", color: "#E05F00" },
  { label: "The Environment", color: "#2E8B57" },
];

export const LOCATION_TAGS: TagDef[] = [
  { label: "Reef", color: "#2F6778" },
  { label: "Manta Rays", color: "#15687A" },
  { label: "New Zealand", color: "#191D32" },
  { label: "Mexico", color: "#E05F00" },
  { label: "Indonesia", color: "#2FA7AD" },
  { label: "Fiji", color: "#FF6900" },
  { label: "Dubai", color: "#C2410C" },
];

export const ALL_TAGS: TagDef[] = [...SUBJECT_TAGS, ...LOCATION_TAGS];
