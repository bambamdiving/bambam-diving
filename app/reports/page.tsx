import { cookies } from "next/headers";
import { supabaseServer, isAnalyticsConfigured } from "@/lib/supabase";
import { getMetaStats, isFacebookConfigured, isInstagramConfigured } from "@/lib/meta";
import { getAllArticles } from "@/lib/articles";
import ReportsLoginForm from "@/components/ReportsLoginForm";
import ReportsTabs from "@/components/ReportsTabs";
import WebsiteReportsPanel from "@/components/WebsiteReportsPanel";
import MetaReportsPanel from "@/components/MetaReportsPanel";
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
  const [rows, metaStats] = await Promise.all([getStats(from, to), getMetaStats()]);
  const pageviews = rows ? tally(rows, "pageview", "path") : [];
  const clicks = rows ? tally(rows, "click", "target") : [];
  const totalViews = pageviews.reduce((sum, [, c]) => sum + c, 0);
  const totalClicks = clicks.reduce((sum, [, c]) => sum + c, 0);

  const articleTitles = new Map(getAllArticles().map((a) => [`/articles/${a.slug}`, a.title]));
  const articlePopularity = pageviews
    .filter(([path]) => articleTitles.has(path))
    .map(([path, count]) => ({ path, title: articleTitles.get(path)!, count }));

  return (
    <ReportsTabs
      logoutAction={logout}
      website={
        <WebsiteReportsPanel
          from={from}
          to={to}
          isAnalyticsConfigured={isAnalyticsConfigured}
          totalViews={totalViews}
          totalClicks={totalClicks}
          articlePopularity={articlePopularity}
          pageviews={pageviews}
          clicks={clicks}
        />
      }
      meta={
        <MetaReportsPanel
          isFacebookConfigured={isFacebookConfigured}
          isInstagramConfigured={isInstagramConfigured}
          stats={metaStats}
        />
      }
    />
  );
}
