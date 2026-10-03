# Web (Next.js)

Public bilingual website. Pages are fully static (`dynamic = "error"`, `revalidate = false`) and rendered from Sanity at build time.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the same Sanity project/dataset as `cms/.env`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, alternates) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`development` locally; `production` for live builds) |

Optional in CI / some layouts: `NEXT_PUBLIC_SITE_NAME` (display name).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (fetches Sanity at build time) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Architecture

| Path | Role |
| --- | --- |
| `app/[lang]/[[...slug]]/` | Locale + path routing (`/de`, `/en/about`, …) |
| `components/` | UI, including section renderers |
| `src/sanity/` | Client, GROQ queries, generated types |
| `src/routing/` | Lang validation and URL helpers |

Content is modelled as **pages → sections** in Sanity. After schema or query changes, regenerate types from `cms/`:

```bash
cd ../cms && npm run typegen
```

## Deploy

Deploy as a separate Vercel project with **Root Directory** = `web`. Set the public env vars above to the `production` dataset and the live site URL.

Smoke tests live in [`../e2e`](../e2e/).
