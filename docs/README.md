# Docs

Operator guide for the site owner: maintain content in Sanity Studio and publish the website. Built with [Astro Starlight](https://starlight.astro.build). The guide is written in **German**.

This folder ships as a **minimal skeleton** (start pages + sidebar stub). Extend it per project.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Per-project values

Site name, URLs, deploy duration, and developer contact live in `src/project.config.ts`. Pages read them from there so the Markdown stays reusable across projects.

## Structure

| Path | Role |
| --- | --- |
| `src/content/docs/` | One `.mdx` file per page |
| `astro.config.mjs` | Sidebar order and Starlight config |
| `src/project.config.ts` | Project-specific strings and URLs |

Add further sections (Inhalte, Veröffentlichen, Hilfe, …) as needed.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Deploy

Deploy as a separate Vercel project with **Root Directory** = `docs`.
