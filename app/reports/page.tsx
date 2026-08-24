import { cookies } from "next/headers";
import { supabaseServer, isAnalyticsConfigured } from "@/lib/supabase";
import { getAllArticles } from "@/lib/articles";
import ReportsLoginForm from "@/components/ReportsLoginForm";
import { logout } from "./actions";

export const metadata = {
  title: "Reports",
  robots: { index: false, follow: false },
};

type EventRow = { type: string; path: string; target: string | null; created_at: string };

async function getStats(from?: string, to?: string) {
  if (!supabaseServer) return null;
  let query = supabaseServer
    .from("events")
    .select("type, path, target, created_at")
    .order("created_at", { ascending: false })
    .limit(5000);
  if (from) query = query.gte("created_at", from);
  if (to) query = query.lte("created_at", `${to}T23:59:59`);
  const { data } = await query;
  return (data ?? []) as EventRow[];
}

function tally(rows: EventRow[], type: string, key: "path" | "target") {
  const counts = new Map<string, number>();
  for (const row of rows) {
    if (row.type !== type) continue;
    const k = row[key];
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const cookieStore = await cookies();
  const authed =
    cookieStore.get("bambam_admin")?.value === process.env.ADMIN_PASSWORD &&
    Boolean(process.env.ADMIN_PASSWORD);

  if (!authed) {
    return (
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ReportsLoginForm />
      </div>
    );
  }

  const { from, to } = await searchParams;
  const rows = await getStats(from, to);
  const pageviews = rows ? tally(rows, "pageview", "path") : [];
  const clicks = rows ? tally(rows, "click", "target") : [];
  const totalViews = pageviews.reduce((sum, [, c]) => sum + c, 0);
  const totalClicks = clicks.reduce((sum, [, c]) => sum + c, 0);

  const articleTitles = new Map(getAllArticles().map((a) => [`/articles/${a.slug}`, a.title]));
  const articlePopularity = pageviews.filter(([path]) => articleTitles.has(path));

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display text-3xl text-ink">
          Reports
        </h1>
        <form action={logout}>
          <button
            type="submit"
            className="font-gauge text-xs tracking-[0.15em] uppercase text-ink-dim hover:text-buoy"
          >
            Log out
          </button>
        </form>
      </div>

      <form className="flex flex-wrap items-end gap-4 mb-10 border border-line rounded-xl p-4 bg-panel" method="get">
        <div>
          <label className="block font-gauge text-[10px] tracking-[0.15em] uppercase text-ink-dim mb-1">
            From
          </label>
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="bg-white border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-buoy"
          />
        </div>
        <div>
          <label className="block font-gauge text-[10px] tracking-[0.15em] uppercase text-ink-dim mb-1">
            To
          </label>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="bg-white border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-buoy"
          />
        </div>
        <button
          type="submit"
          className="font-body text-sm font-medium bg-teal hover:bg-teal-deep text-white px-5 py-2 rounded-full transition-colors"
        >
          Apply
        </button>
        {(from || to) && (
          <a href="/reports" className="font-body text-sm text-ink-dim hover:text-buoy">
            Clear
          </a>
        )}
      </form>

      {!isAnalyticsConfigured && (
        <div className="border border-buoy/40 bg-panel rounded-xl p-6 mb-10">
          <p className="font-display uppercase text-buoy text-sm mb-2">
            Not connected yet
          </p>
          <p className="text-ink-dim text-sm leading-relaxed">
            Add your Supabase project URL and keys as environment variables
            (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
            SUPABASE_SERVICE_ROLE_KEY) and this page will start showing real
            numbers. Ask me and I&rsquo;ll walk you through the 5-minute setup.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        <div className="border border-line bg-white rounded-xl p-6">
          <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-ink-dim mb-2">
            Total Pageviews
          </p>
          <p className="font-display text-4xl text-ink">{totalViews}</p>
        </div>
        <div className="border border-line bg-white rounded-xl p-6">
          <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-ink-dim mb-2">
            Total Link Clicks
          </p>
          <p className="font-display text-4xl text-ink">{totalClicks}</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display uppercase text-lg text-ink mb-4">
          Articles by Popularity
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {articlePopularity.map(([path, count]) => (
            <li key={path} className="py-2.5 flex justify-between gap-4 text-sm">
              <span className="font-gauge text-ink-dim truncate">{articleTitles.get(path)}</span>
              <span className="font-gauge text-ink">{count}</span>
            </li>
          ))}
          {articlePopularity.length === 0 && (
            <li className="py-2.5 text-ink-dim text-sm">No data yet.</li>
          )}
        </ul>
      </div>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display uppercase text-lg text-ink mb-4">
            Top Pages
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {pageviews.slice(0, 15).map(([path, count]) => (
              <li key={path} className="py-2.5 flex justify-between gap-4 text-sm">
                <span className="font-gauge text-ink-dim truncate">{path}</span>
                <span className="font-gauge text-ink">{count}</span>
              </li>
            ))}
            {pageviews.length === 0 && (
              <li className="py-2.5 text-ink-dim text-sm">No data yet.</li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="font-display uppercase text-lg text-ink mb-4">
            Top Link Clicks
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {clicks.slice(0, 15).map(([target, count]) => (
              <li key={target} className="py-2.5 flex justify-between gap-4 text-sm">
                <span className="font-gauge text-ink-dim truncate">{target}</span>
                <span className="font-gauge text-ink">{count}</span>
              </li>
            ))}
            {clicks.length === 0 && (
              <li className="py-2.5 text-ink-dim text-sm">No data yet.</li>
            )}
          </ul>
        </div>
      </div>

      <p className="text-ink-dim text-sm mt-12">
        &ldquo;Get Published&rdquo; submissions aren&rsquo;t stored here &mdash; once the
        Formspree endpoint is set up, they land straight in your email and in your
        Formspree dashboard.
      </p>
    </div>
  );
}
