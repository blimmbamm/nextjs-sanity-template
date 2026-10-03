# E2E

Smoke tests for the Next.js site in [`../web`](../web/), run with Playwright against a production build (`next build` + `next start`).

## Setup

```bash
npm install
npx playwright install chromium
```

The build needs Sanity public env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, dataset, site URL/name). Locally Next.js also loads `web/.env` if present. No API token is required.

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Build the site if needed, start it, run all tests |
| `npm run test:ui` | Same, with the Playwright UI |

If `web` is already running on port 3000 locally, Playwright reuses that server (skipping the build). Prefer a production server (`npm run build && npm run start` in `web/`) when testing locally.

## Tests

Specs live in `tests/`. Keep them as high-level smoke checks (home loads, basic routing), not full editorial coverage.

## CI

GitHub Actions runs on every push/PR to `main` so required status checks always get a result. The Playwright suite only runs when `web/`, `e2e/`, or the workflow changed; otherwise the job succeeds immediately.

Set repository variables (Settings → Variables) before the suite is expected to run:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (optional, defaults to `development`)
- `NEXT_PUBLIC_SITE_NAME` (optional)

See [`.github/workflows/e2e-web.yml`](../.github/workflows/e2e-web.yml).
