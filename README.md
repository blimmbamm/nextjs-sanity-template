# Next.js + Sanity template

Starter for a bilingual Sanity + Next.js site, with operator docs and E2E smoke tests.

## Repository layout

| Folder | Stack | Role |
| --- | --- | --- |
| [`cms/`](cms/) | Sanity Studio | Content model and editorial UI |
| [`web/`](web/) | Next.js | Public website |
| [`docs/`](docs/) | Astro Starlight | Operator guide (German skeleton) |
| [`e2e/`](e2e/) | Playwright | Smoke tests for `web/` |

Each package has its own `package.json` and README (where present).

## Local development

```bash
# Studio — http://localhost:3333
cd cms && cp .env.example .env && npm install && npm run dev

# Website — http://localhost:3000
cd web && cp .env.example .env && npm install && npm run dev

# Docs — http://localhost:4321
cd docs && npm install && npm run dev
```

Point `cms` and `web` at the same Sanity project. Prefer the `development` dataset locally; use `production` for live builds and the hosted Studio.

After schema or GROQ query changes, regenerate types from `cms/` (see `cms/README.md` if present).

## Deploy (overview)

- **Website / docs** — separate Vercel projects (`Root Directory` = `web` or `docs`)
- **Studio** — `cd cms && npm run deploy`
- **Content updates** — Studio deploy tool + Vercel deploy hook (static rebuild)

Per-project URLs for the operator guide live in `docs/src/project.config.ts`.

## Tests

```bash
cd e2e && npm install && npx playwright install chromium && npm test
```

GitHub Actions: [`.github/workflows/e2e-web.yml`](.github/workflows/e2e-web.yml). Configure repository variables for the Sanity project ID before expecting the suite to run on `web/`/`e2e/` changes.
