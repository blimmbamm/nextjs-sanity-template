# Docs

Operator guide for the site owner: how to maintain content in Sanity Studio and publish the website. Built with [Astro Starlight](https://starlight.astro.build). The guide is written in German.

This folder ships as a **minimal skeleton**: two pages and a sidebar stub. Extend it per project.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Per-project values

Site name, URLs, deploy duration and developer contact live in `src/project.config.ts`. Pages read them from there, so the Markdown stays reusable.

## Structure

- `src/content/docs/` — one `.mdx` file per page
- Sidebar order is defined in `astro.config.mjs`
- Add further sections (Inhalte, Veröffentlichen, Hilfe, …) as needed

## Build

```bash
npm run build
```
