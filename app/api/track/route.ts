import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Analytics not configured yet - fail silently so the site never breaks
  // because of this. See /admin for setup instructions.
  if (!url || !serviceKey) {
    return NextResponse.json({ ok: true, tracked: false });
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.type || !body.path) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = createClient(url, serviceKey);
  await supabase.from("events").insert({
    type: body.type, // "pageview" | "click"
    path: body.path,
    target: body.target ?? null, // for clicks: the outbound URL or button label
  });

  return NextResponse.json({ ok: true, tracked: true });
}
