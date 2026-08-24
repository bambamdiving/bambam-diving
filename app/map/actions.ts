"use server";

import { supabaseServer } from "@/lib/supabase";
import { isAdminAuthed } from "@/lib/auth";

export async function savePinPosition(country: string, x: number, y: number) {
  if (!(await isAdminAuthed())) {
    return { error: "Not authorized." };
  }
  if (!supabaseServer) {
    return { error: "Supabase isn't connected yet." };
  }
  const { error } = await supabaseServer
    .from("map_pins")
    .upsert({ country, x, y });
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}
