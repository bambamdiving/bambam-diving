import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client-safe instance, used for writing pageview/click events.
export const supabaseBrowser =
  url && anonKey ? createClient(url, anonKey) : null;

// Server-only instance with elevated privileges, used for reading aggregated
// stats on the admin page. Never import this in a client component.
export const supabaseServer =
  url && serviceKey ? createClient(url, serviceKey) : null;

export const isAnalyticsConfigured = Boolean(url && anonKey);
