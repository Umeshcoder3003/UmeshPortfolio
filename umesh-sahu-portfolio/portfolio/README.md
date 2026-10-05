# Umesh Sahu: Data Engineering Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Content lives in `src/data/`, UI lives in `src/components/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
```
Requires Node 18.18+.

## Where things go

| What | File | Field |
|---|---|---|
| Email | `src/data/site.ts` | `email` (already set) |
| LinkedIn | `src/data/site.ts` | `linkedin` (already set) |
| GitHub | `src/data/site.ts` | `github` (replace `[MY_GITHUB_URL]`) |
| Resume | `src/data/site.ts` | `resume`. Put `resume.pdf` in `/public` and set `"/resume.pdf"`, or paste a Drive link |
| Domain for SEO | `src/data/site.ts` | `url` |
| Experience | `src/data/profile.ts` | `experience` (replace the placeholder entry) |
| Skills | `src/data/profile.ts` | `skillGroups` (`professional` or `handson` per skill) |
| Certifications | `src/data/profile.ts` | `certifications` (empty = placeholders shown) |
| Featured GitHub repos | `src/data/github.ts` | `featuredRepos` (empty = live list from the GitHub API) |
| Projects / case studies | `src/data/projects.ts` | `projects` |

While `github` or `resume` still hold `[BRACKET]` placeholders, the related buttons are hidden or fall back to the contact section instead of linking to a broken URL.

## Add a new case study

1. Copy `src/data/project-template.ts`.
2. Fill in the fields you have. Every optional field you leave out is simply hidden, so nothing is fabricated.
3. Add the object to the `projects` array in `src/data/projects.ts`.

That is all. The project card, the case-study page at `/projects/<slug>`, the Case Studies index, the sitemap and the architecture diagram update automatically.

Architecture stages use an `icon` (`source`, `ingestion`, `bronze`, `silver`, `gold`, `validation`, `quality`, `transform`, `storage`, `serving`, `analytics`, `curated`, `sql`, `oracle`, `python`, `spark`, `fabric`, `databricks`, `azure`, `lake`, `warehouse`, `api`, `file`) and an optional `layer` (`bronze` | `silver` | `gold`) that colours the stage.

## Structure

```
src/
  app/            layout, home page, /projects/[slug], sitemap, robots, OG image
  components/     Navbar, Hero, PipelineVisual, About, WhatIBring, Experience, Skills,
                  Projects, ProjectCard, CaseStudy, ArchitectureDiagram, CaseStudiesIndex,
                  HowISolve, GitHubSection, Learning, Certifications, Contact, FinalCTA, Footer
  data/           site.ts, profile.ts, projects.ts, project-template.ts, github.ts
  types/          shared TypeScript types
```

## Deploy

**Vercel (simplest):** push the repo to GitHub, import it at vercel.com, keep the defaults, deploy. Then set `url` in `site.ts` to your live domain.

**Netlify / other:** build command `npm run build`, use the Next.js runtime/adapter.

## Add screenshots to a case study

1. Create a folder `public/projects/<slug>/` and drop your images in (PNG or JPG, ideally ~1600px wide, named in order: `01-source.png`, `02-validation.png`).
2. Add a `screenshots` array to the project in `src/data/projects.ts`:
   ```ts
   screenshots: [
     { src: "/projects/<slug>/01-source.png", alt: "What the image shows", caption: "Short step description" },
   ],
   ```
3. They appear in a numbered "Walkthrough" section. Clicking an image opens it full size.

Redact anything sensitive (real employee data, company names, credentials, tenant IDs) before adding a screenshot.
