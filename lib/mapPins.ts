import { supabaseServer } from "./supabase";

export type PinOverride = { x: number; y: number };

export async function getPinOverrides(): Promise<Record<string, PinOverride>> {
  if (!supabaseServer) return {};
  const { data } = await supabaseServer.from("map_pins").select("country, x, y");
  const overrides: Record<string, PinOverride> = {};
  for (const row of data ?? []) {
    overrides[row.country] = { x: row.x, y: row.y };
  }
  return overrides;
}
