"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct) {
    return { error: "ADMIN_PASSWORD is not set in your environment yet." };
  }

  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("bambam_admin", correct, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return { error: null };
  }

  return { error: "Wrong password." };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("bambam_admin");
}
