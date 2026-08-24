import type { MetaStats } from "@/lib/meta";

function StatTile({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="border border-line bg-white rounded-xl p-6">
      <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-ink-dim mb-2">
        {label}
      </p>
      <p className="font-display text-4xl text-ink">{value ?? "—"}</p>
    </div>
  );
}

export default function MetaReportsPanel({
  isFacebookConfigured,
  isInstagramConfigured,
  stats,
}: {
  isFacebookConfigured: boolean;
  isInstagramConfigured: boolean;
  stats: MetaStats;
}) {
  if (!isFacebookConfigured && !isInstagramConfigured) {
    return (
      <div className="border border-buoy/40 bg-panel rounded-xl p-6">
        <p className="font-display uppercase text-buoy text-sm mb-2">
          Not connected yet
        </p>
        <p className="text-ink-dim text-sm leading-relaxed">
          Connect a Meta Developer app with access to your Facebook Page and
          Instagram account, then add META_ACCESS_TOKEN, META_PAGE_ID, and
          META_IG_USER_ID as environment variables and this tab will start
          showing real follower counts, engagement, and reach. Ask me and
          I&rsquo;ll walk you through it.
        </p>
      </div>
    );
  }

  const fb = stats.facebook;
  const ig = stats.instagram;
  const fbEngagement = fb
    ? fb.recentPosts.reduce((sum, p) => sum + p.likes + p.comments + p.shares, 0)
    : null;
  const igEngagement = ig
    ? ig.recentPosts.reduce((sum, p) => sum + p.likes + p.comments, 0)
    : null;

  return (
    <div className="space-y-12">
      {fb && (
        <div>
          <h2 className="font-display uppercase text-lg text-ink mb-4">Facebook</h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-4">
            <StatTile label="Followers" value={fb.followers} />
            <StatTile label="Reach (28 days)" value={fb.reach} />
            <StatTile label="Engagement (recent posts)" value={fbEngagement} />
          </div>
          {fb.errors.length > 0 && (
            <p className="text-buoy text-xs mb-4">
              Some Facebook data couldn&rsquo;t load: {fb.errors.join("; ")}
            </p>
          )}
          <ul className="divide-y divide-line border-y border-line">
            {fb.recentPosts.map((post) => (
              <li
                key={post.permalink ?? post.createdTime}
                className="py-2.5 flex justify-between gap-4 text-sm"
              >
                <span className="font-gauge text-ink-dim truncate">
                  {post.message ?? "(no caption)"}
                </span>
                <span className="font-gauge text-ink text-xs whitespace-nowrap">
                  {post.likes} likes &middot; {post.comments} comments &middot; {post.shares} shares
                </span>
              </li>
            ))}
            {fb.recentPosts.length === 0 && (
              <li className="py-2.5 text-ink-dim text-sm">No recent posts.</li>
            )}
          </ul>
        </div>
      )}

      {ig && (
        <div>
          <h2 className="font-display uppercase text-lg text-ink mb-4">Instagram</h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-4">
            <StatTile label="Followers" value={ig.followers} />
            <StatTile label="Reach (today)" value={ig.reach} />
            <StatTile label="Engagement (recent posts)" value={igEngagement} />
          </div>
          {ig.errors.length > 0 && (
            <p className="text-buoy text-xs mb-4">
              Some Instagram data couldn&rsquo;t load: {ig.errors.join("; ")}
            </p>
          )}
          <ul className="divide-y divide-line border-y border-line">
            {ig.recentPosts.map((post) => (
              <li
                key={post.permalink ?? post.timestamp}
                className="py-2.5 flex justify-between gap-4 text-sm"
              >
                <span className="font-gauge text-ink-dim truncate">
                  {post.caption ?? "(no caption)"}
                </span>
                <span className="font-gauge text-ink text-xs whitespace-nowrap">
                  {post.likes} likes &middot; {post.comments} comments
                </span>
              </li>
            ))}
            {ig.recentPosts.length === 0 && (
              <li className="py-2.5 text-ink-dim text-sm">No recent posts.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
