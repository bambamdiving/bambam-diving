import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  tags?: string[];
  contributor?: string;
  location: string;
  depth: string;
  diveTime: string;
  waterTemp: string;
  visibility: string;
  date: string;
  youtubeId?: string;
  coverImage?: string;
  featured?: boolean;
};

export type Article = ArticleMeta & { content: string };

export function getAllSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...(data as Omit<ArticleMeta, "slug">), slug, content };
}

export function getAllArticles(): ArticleMeta[] {
  return getAllSlugs()
    .map((slug) => getArticleMetaBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function getArticleMetaBySlug(slug: string): ArticleMeta {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return { ...(data as Omit<ArticleMeta, "slug">), slug };
}

export function getFeaturedArticles(): ArticleMeta[] {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  return featured.length ? featured : all.slice(0, 4);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
