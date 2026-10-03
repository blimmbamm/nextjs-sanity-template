# Next.js + Sanity template

Starter for a bilingual Sanity + Next.js site, with operator docs and E2E smoke tests.

## Repository layout

| Folder | Stack | Role |
| --- | --- | --- |
| [`cms/`](cms/) | Sanity Studio | Content model and editorial UI |
| [`web/`](web/) | Next.js | Public website |
| [`docs/`](docs/) | Astro Starlight | Operator guide (German skeleton) |
| [`e2e/`](e2e/) | Playwright | Smoke tests for `web/` |

Each package has its own `package.json` and README. CMS component catalog: [`cms/README.md`](cms/README.md).

## Local development

```bash
# Studio — http://localhost:3333
cd cms && cp .env.example .env && npm install && npm run dev

# Website — http://localhost:3000
cd web && cp .env.example .env && npm install && npm run dev

# Docs — http://localhost:4321
cd docs && npm install && npm run dev
```

Point `cms` and `web` at the same Sanity project. A new Sanity project only has `production` — create `development` once from `cms/` with `npm run dataset:create-development`, then use that dataset locally. Use `production` for live builds and the hosted Studio. See [`cms/README.md`](cms/README.md) for dataset sync scripts.

After schema or GROQ query changes, regenerate types from `cms/`:

```bash
cd cms && npm run typegen
```

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

## Dependency updates (Renovate)

[`renovate.json`](renovate.json) configures [Renovate](https://docs.renovatebot.com/) for all packages (`web`, `cms`, `docs`, `e2e`):

- **Patch / minor** — auto-merged when status checks are green
- **Major** — PR only; merge manually after review
- **Dependency Dashboard** — GitHub issue listing pending / deferred updates

**One-time setup per GitHub repo** (template and each customer fork):

1. Install the [Mend Renovate GitHub App](https://github.com/apps/renovate) on the repository
2. In **Settings → General → Pull Requests**, enable **Allow auto-merge**
3. Prefer a branch protection rule on `main` with required status checks (e.g. `e2e`) so auto-merge waits for CI

Vercel deploys follow the merge to `main`. Hosted Studio still needs `cd cms && npm run deploy` after CMS dependency changes.
