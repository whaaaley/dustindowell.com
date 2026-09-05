# dustindowell.com

The personal site of Dustin Dowell, Software Engineer in Des Moines, Iowa.
The site is the resume: the page at `/` renders the same content as the PDF it links to, with product pages for the work behind each job.

## Tech Stack

- Deno 2.9 workspace with `common/`, `client/`, `worker/`, and `tools/` members
- Vue 3 with TSX components, `class-variance-authority` for variants, and Tailwind 4 through the Vite plugin
- vite-ssg prerendering every route to static HTML, with a sitemap from `vite-ssg-sitemap`
- Markdown content parsed with the mdast and hast stack and rendered as Vue nodes
- Cloudflare Workers Static Assets serving `client/dist`, with a small Worker for the 404 page and the analytics proxy
- Umami analytics on Fly.io, reached first-party through the Worker
- Vitest for unit tests, Playwright for page and behavior specs, Lighthouse for scores

## Repository Structure

```
client/          the site: Vite config, Tailwind config, pages, components, specs
  src/features/  one folder per page or content area (resume, work, licenses, links, playground, banner)
  src/components/ shared components: markdown renderer, slider, wordmark, contact reveal
  src/layouts/   the website layout with header, nav, main, and footer
  public/        fonts, screenshots, favicons, the resume PDF, the social banner image
worker/          the Cloudflare Worker and its wrangler config (dev and prod environments)
common/          the safe result helpers shared by the scripts and tools
tools/           project CLI tools: wordmark tracing, banner capture, Lighthouse
services/umami/  the Fly config for the analytics app
scripts/         one-time setup scripts for GitHub secrets and the Fly Postgres
_local/          gitignored: the Pencil design, fonts, notes, PDF exports, checkpoints
```

## Requirements

- Deno 2.9.5 or newer
- A Chromium for Playwright (`deno run -A npm:playwright install chromium`) and the system Chromium for Lighthouse

## Getting Started

```bash
git clone https://github.com/whaaaley/dustindowell.com.git
cd dustindowell.com
deno install --allow-scripts
deno task dev        # Vite dev server on http://localhost:5180
```

`deno task build` writes the static site to `client/dist`, and `deno task preview` serves that build through the Worker on http://localhost:8787, which is the closest thing to production.

Run wrangler commands from the `onclick` tmux session so they can be watched.

## Tasks

From the repo root:

| Task | What it does |
|------|--------------|
| `deno task dev` | Vite dev server for the client |
| `deno task build` | Generate the third-party notices, then prerender the site |
| `deno task preview` | Serve the build through the Worker with `wrangler dev` |
| `deno task lint` | ESLint over the client source |
| `deno task test` | Unit tests in `common`, `tools`, and the client |
| `deno task test:e2e` | Playwright specs on desktop and a phone viewport |
| `deno task type-check` | `deno check` across every workspace member |

From `tools/`:

| Task | What it does |
|------|--------------|
| `deno task wordmark` | Trace the name from the licensed font into `Wordmark.tsx` |
| `deno task og` | Screenshot the `/banner` page into `public/og-home.png` |
| `deno task lighthouse [paths]` | Score pages against a running build and fail under 90 |

Each tool reads its settings from `tools/config.json`.

## Content

The resume lives in `client/src/features/resume/resume.md` and the products in `client/src/features/work/products/*.md`, each with YAML front matter for title, dates, tagline, and screenshots.
A `::slider` line in a product file marks where its screenshot gallery renders.

Every wording change to the resume goes to four places in the same step: the markdown here, the newest checkpoint under `_local/design/backups/`, the Pencil design file, and the re-exported PDFs in `_local/exports/` with the light one copied to `client/public/dustin-dowell-resume.pdf`.

The third-party license pages are generated at build time from the installed packages; the notices folder is gitignored.

## Testing

Unit tests sit beside the code they cover as `*.test.ts` and run with Vitest in the client and `deno test` elsewhere.
Playwright specs sit beside each page as `*.spec.ts`, scope every locator to a page test id, and fail on any uncaught page error.
The slider has a behavior spec against the `/playground` page, which lists each component with its variants and a state readout.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yaml`: tests, type-check and lint, the client build, then two deploys in parallel, the Worker to Cloudflare and the Umami app to Fly, followed by a `deploy-N` GitHub release.
Nothing deploys from a laptop; the only local wrangler use is `deno task preview`.

The two secrets the workflow needs, `CLOUDFLARE_API_TOKEN` and `FLY_API_TOKEN`, are pushed from a gitignored `scripts/github/.env` by `scripts/github/update-secrets.sh`.
`scripts/github/run-workflow.sh` triggers the workflow by hand.

## Analytics

Umami runs on Fly as `dustindowell-umami` with its own Postgres, sized at 512mb with a swap file and suspended between page views.
The Worker proxies `/umami/*` to it, so the tracker loads from the site's own domain and survives ad blockers.
The tracker tag in `client/index.html` takes its URL and website id from `client/.env.production`.
`scripts/fly/create-umami-pg.sh` provisions the database once and `scripts/fly/update-umami-secrets.sh` pushes the app secret.

## Machine Sizing

Every Fly machine runs the smallest size its measured memory allows, and the one that can sleep does.

| App | Memory | Swap | Sleeps | Peak used | Why |
|-----|--------|------|--------|-----------|-----|
| dustindowell-umami | 512mb | 512MB | yes | 251MB | Next.js and Prisma; boot migrations spike past 512MB and the swap file absorbs it |
| dustindowell-umami-pg | 256mb | none | no | 156MB | Postgres; a database cannot wake on demand |

Peak used is `mem_total - mem_available`, the kernel's own estimate of what the process set needs after reclaimable cache is subtracted, measured over the app's first day.

- Start from peak used, add headroom for a wake-up burst, and round to the next Fly size. 256mb is the floor, then 512mb, then 1gb.
- Swap keeps Umami on 512mb, but Fly cannot snapshot a machine with swap, so it stops rather than suspends and cold-boots on wake in a few seconds. Visitors never feel it since the tracker is a background beacon; the dashboard does. 1gb with no swap resumes in about a second if that ever matters more than the few cents.
- `fly deploy` does not resize an existing machine. `[[vm]]` shapes new machines only, so a size change is `fly scale memory <mb> -a <app>` plus the same value in `services/umami/fly.toml`.

Re-check the peaks with the `fly-metrics` tool from `tools/`, using a short-lived read-only token (`flyctl tokens create readonly --org personal --expiry 1h`) exported as `FLY_METRICS_TOKEN`:

```bash
deno task fly-metrics memory-peak
deno task fly-metrics memory-total
```

## Conventions

The repo follows the onclick rules, symlinked into `.claude/rules`: TSX components with cva variants, no comments unless they explain a non-obvious choice, arrow functions, no casts or non-null assertions, gap over margin, and `*.page.tsx` for routes.
Commits use the conventional format checked by onclick's validator, installed with `git config core.hooksPath /home/dustin/work/onclick/tools/commit/hooks`.
