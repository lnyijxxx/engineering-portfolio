# Engineering Knowledge Base

Personal engineering wiki + portfolio for embedded systems, robotics, and
PCB design work. Built with Next.js (App Router), TypeScript, Tailwind CSS,
and a hand-rolled MDX content pipeline (no CMS, no database — content is
just files in `content/`, versioned in git).

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000. First run needs internet access so Next.js can
fetch Space Grotesk / Inter / JetBrains Mono from Google Fonts — after that
they're cached locally.

## Adding content

Everything under `content/` is plain Markdown/MDX with frontmatter. No code
changes needed for any of the following:

**New project** — create `content/projects/<slug>/index.mdx` with the
required frontmatter (see any existing project for the shape), plus an
optional `journal/` subfolder for dated check-ins and an `assets/` subfolder
for images. It shows up on `/projects` automatically.

**New note** — create `content/notes/<any>/<nesting>/<you>/<want>.mdx`.
The folder structure *is* the site's nav and URL structure — nothing else to
update. Required frontmatter: `title`, `date`, `tags`.

**New journal entry** — drop a dated file in an existing project's
`journal/` folder, e.g. `content/projects/drone/journal/2026-06.mdx`.
Frontmatter: `date`, `title`.

All of the above are validated against Zod schemas in
`lib/content/schema.ts` at build time — a typo or missing field fails the
build with a clear error instead of silently breaking a page later.

## Architecture notes

- `lib/content/loader.ts` — the entire content pipeline: walks `content/`,
  parses frontmatter with `gray-matter`, validates with Zod. No Contentlayer
  or other third-party content layer — those have a track record of going
  unmaintained, and this is meant to still work in 10 years.
- `lib/timeline.ts` — derives `/timeline` from frontmatter dates across
  projects, journals, and notes. Never hand-maintained.
- `lib/search-index.ts` + `lib/search.ts` — a build-time search index with a
  simple tag/title/body scorer, filtered client-side on `/search`. No search
  backend to run or pay for.
- `app/notes/[...slug]/page.tsx` — a catch-all route, so the URL structure
  mirrors the `content/notes/` folder structure exactly.

## Still to do before this is "live"

- Add `public/resume.pdf` (the `/resume` page links to it — see
  `RESUME_PLACEHOLDER.txt` in `public/`).
- Update the GitHub links, email, and `yourusername` placeholders in
  `content/` and `content/about/index.mdx`.
- Pick a deploy target — this is a static-friendly Next.js app, Vercel is the
  path of least resistance (`vercel deploy` after pushing to GitHub) but
  anything that runs Next.js works.
