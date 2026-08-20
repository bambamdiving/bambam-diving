# BamBam Diving

Rebuilt site: Next.js + Tailwind, content in plain Markdown, hosted for free
on Vercel. No WordPress, no plugins that quietly break, no waiting on a
designer — update it by describing the change to Claude.

## Structure

- `content/articles/*.md` — every article, as Markdown with frontmatter
  (title, categories, location, dive-log stats, YouTube ID). Edit or add a
  file here to publish a new article.
- `content/gallery/photos.json` — manual gallery entries. Add photo files to
  `public/gallery/` and reference them here.
- `app/` — every page (Next.js App Router).
- `components/` — shared UI pieces (Header, Footer, ArticleCard, DiveLog,
  ContributorForm, Analytics).

## Running locally

```bash
npm install
npm run dev
```

## Before going live

1. **Get Published form** — create a free form at https://formspree.io,
   paste the endpoint into `components/ContributorForm.tsx`
   (the `FORM_ENDPOINT` constant).
2. **Hidden analytics (`/admin`)** — create a free project at
   https://supabase.com, run the SQL below, then set these environment
   variables (in Vercel: Project Settings > Environment Variables):
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

   ```sql
   create table events (
     id bigint generated always as identity primary key,
     type text not null,
     path text not null,
     target text,
     created_at timestamptz default now()
   );
   ```
3. **Domain** — once you have your EPP code / DNS access back from your
   designer, point bambamdiving.com at Vercel (Vercel gives you exact DNS
   records once the project is created).

## Deploying

1. Push this folder to a new GitHub repo.
2. Import the repo at https://vercel.com/new — it auto-detects Next.js,
   no config needed.
3. Add the environment variables above in Vercel before or after first
   deploy.
4. Point your domain at Vercel once DNS is sorted.

## Updating content going forward

Just tell Claude what you want changed — a new article, new gallery photos,
copy tweaks, a new page. This is a real, ordinary Next.js project, so Claude
Code (the desktop app) is the best tool for ongoing prompt-driven edits, with
this repo connected to GitHub for deploys.
