const GRAPH_VERSION = "v21.0";
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

const pageId = process.env.META_PAGE_ID;
const igUserId = process.env.META_IG_USER_ID;
const accessToken = process.env.META_ACCESS_TOKEN;

export const isFacebookConfigured = Boolean(pageId && accessToken);
export const isInstagramConfigured = Boolean(igUserId && accessToken);

type FacebookPost = {
  message: string | null;
  createdTime: string;
  likes: number;
  comments: number;
  shares: number;
  permalink: string | null;
};

type FacebookStats = {
  followers: number | null;
  reach: number | null;
  recentPosts: FacebookPost[];
  errors: string[];
};

type InstagramPost = {
  caption: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  permalink: string | null;
};

type InstagramStats = {
  followers: number | null;
  reach: number | null;
  recentPosts: InstagramPost[];
  errors: string[];
};

export type MetaStats = {
  facebook: FacebookStats | null;
  instagram: InstagramStats | null;
};

async function graphGet(path: string, params: Record<string, string>) {
  const url = new URL(`${GRAPH_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set("access_token", accessToken!);
  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error?.message ?? `Graph API error (${res.status})`);
  }
  return json;
}

async function getFacebookStats(): Promise<FacebookStats> {
  const errors: string[] = [];
  let followers: number | null = null;
  let reach: number | null = null;
  let recentPosts: FacebookPost[] = [];

  try {
    const profile = await graphGet(`/${pageId}`, { fields: "followers_count" });
    followers = profile.followers_count ?? null;
  } catch (e) {
    errors.push(`Followers: ${(e as Error).message}`);
  }

  try {
    const insights = await graphGet(`/${pageId}/insights`, {
      metric: "page_impressions_unique",
      period: "days_28",
    });
    const values = insights.data?.[0]?.values;
    reach = values?.[values.length - 1]?.value ?? null;
  } catch (e) {
    errors.push(`Reach: ${(e as Error).message}`);
  }

  try {
    const posts = await graphGet(`/${pageId}/posts`, {
      fields: "message,created_time,permalink_url,likes.summary(true),comments.summary(true),shares",
      limit: "10",
    });
    recentPosts = (posts.data ?? []).map((p: Record<string, unknown>) => {
      const likes = p.likes as { summary?: { total_count?: number } } | undefined;
      const comments = p.comments as { summary?: { total_count?: number } } | undefined;
      const shares = p.shares as { count?: number } | undefined;
      return {
        message: (p.message as string) ?? null,
        createdTime: p.created_time as string,
        likes: likes?.summary?.total_count ?? 0,
        comments: comments?.summary?.total_count ?? 0,
        shares: shares?.count ?? 0,
        permalink: (p.permalink_url as string) ?? null,
      };
    });
  } catch (e) {
    errors.push(`Recent posts: ${(e as Error).message}`);
  }

  return { followers, reach, recentPosts, errors };
}

async function getInstagramStats(): Promise<InstagramStats> {
  const errors: string[] = [];
  let followers: number | null = null;
  let reach: number | null = null;
  let recentPosts: InstagramPost[] = [];

  try {
    const profile = await graphGet(`/${igUserId}`, { fields: "followers_count" });
    followers = profile.followers_count ?? null;
  } catch (e) {
    errors.push(`Followers: ${(e as Error).message}`);
  }

  try {
    const insights = await graphGet(`/${igUserId}/insights`, {
      metric: "reach",
      period: "day",
      metric_type: "total_value",
    });
    reach = insights.data?.[0]?.total_value?.value ?? null;
  } catch (e) {
    errors.push(`Reach: ${(e as Error).message}`);
  }

  try {
    const media = await graphGet(`/${igUserId}/media`, {
      fields: "caption,timestamp,permalink,like_count,comments_count",
      limit: "10",
    });
    recentPosts = (media.data ?? []).map((m: Record<string, unknown>) => ({
      caption: (m.caption as string) ?? null,
      timestamp: m.timestamp as string,
      likes: (m.like_count as number) ?? 0,
      comments: (m.comments_count as number) ?? 0,
      permalink: (m.permalink as string) ?? null,
    }));
  } catch (e) {
    errors.push(`Recent posts: ${(e as Error).message}`);
  }

  return { followers, reach, recentPosts, errors };
}

export async function getMetaStats(): Promise<MetaStats> {
  const [facebook, instagram] = await Promise.all([
    isFacebookConfigured ? getFacebookStats() : Promise.resolve(null),
    isInstagramConfigured ? getInstagramStats() : Promise.resolve(null),
  ]);
  return { facebook, instagram };
}
