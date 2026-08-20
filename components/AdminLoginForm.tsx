"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/admin/actions";

export default function AdminLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await login(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <form action={handleSubmit} className="max-w-sm mx-auto mt-24 space-y-4">
      <h1 className="font-display text-2xl text-ink text-center mb-6">
        Admin
      </h1>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full bg-white border border-line focus:border-buoy rounded-lg px-4 py-3 text-ink outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full font-display text-sm tracking-[0.1em] uppercase bg-buoy hover:bg-buoy-dim disabled:opacity-60 text-white font-medium px-6 py-3 rounded-full transition-colors"
      >
        {isPending ? "Checking..." : "Enter"}
      </button>
      {error && <p className="text-buoy text-sm text-center">{error}</p>}
    </form>
  );
}
