"use server";

import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { isAdminAuthed } from "@/lib/auth";

export async function verifyPin(pin: string) {
  const correct = process.env.ADMIN_PASSWORD;
  if (!correct) {
    return { error: "PIN is not set up yet." };
  }
  if (pin !== correct) {
    return { error: "Wrong PIN." };
  }
  const cookieStore = await cookies();
  cookieStore.set("bambam_admin", correct, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return { error: null };
}

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
