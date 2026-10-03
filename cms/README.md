# CMS (Sanity Studio)

Editorial UI and content model for the bilingual site. Studio languages: **German (`de`)** and **English (`en`)**.

Schema sources: `schemaTypes/`.

## Setup

A new Sanity project starts with a single dataset named **`production`**. This template expects a second dataset **`development`** for local work.

```bash
cp .env.example .env
# Set SANITY_STUDIO_PROJECT_ID (and keep SANITY_STUDIO_DATASET=development)
npm install
npm run dataset:create-development   # once per new Sanity project
npm run dev
```

Open [http://localhost:3333](http://localhost:3333).

`SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` must match `web/.env`. Prefer the `development` dataset locally; use `production` for the hosted Studio and live builds.

| Variable | Purpose |
| --- | --- |
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID |
| `SANITY_STUDIO_DATASET` | Dataset (`development` / `production`) |
| `SANITY_STUDIO_TITLE` | Display name in the Studio sidebar |
| `SANITY_STUDIO_DEPLOY_HOOK` | Optional Vercel deploy-hook URL for the Deploy tool |
| `SANITY_STUDIO_VERCEL_LINK` | Optional dashboard link shown in the Deploy tool |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Studio |
| `npm run build` | Production Studio build |
| `npm run deploy` | Deploy Studio to Sanity hosting |
| `npm run typegen` | Extract schema + generate TypeScript types for `web/` |
| `npm run dataset:create-development` | Create the empty `development` dataset (cold start for local work) |
| `npm run sync:prod-to-dev` | Replace `development` with a copy of `production` (asks `y/N` first) |
| `npm run sync:dev-to-prod` | Replace `production` with a copy of `development` (asks `y/N` first) |

### Datasets

| Dataset | Role |
| --- | --- |
| `development` | Local Studio + local Next.js. Create once with `npm run dataset:create-development`. |
| `production` | Created by Sanity with the project. Used by the live site and hosted Studio. |

Sync commands export the source dataset, import it into the target with `--replace`, then delete the temporary archive. Both directions prompt for confirmation in the terminal (`y` / `yes` to proceed; anything else aborts). `sync:dev-to-prod` prints an extra warning because it overwrites live content.

After schema or GROQ query changes in `web/src/sanity/queries.ts`:

```bash
npm run typegen
```

This writes `schema.json` here and regenerates `../web/src/sanity/types.ts` (configured in `sanity.cli.ts`).

---

## Studio sidebar

Under **Content**:

| Area | What it contains |
| --- | --- |
| **Pages** | Homepages, studio groups, Ungrouped pages, All pages |
| **Main Navigation** | Fixed DE / EN singletons (`navigation-de`, `navigation-en`) |
| **Image** | Reusable single images (`singleImage`) |
| **Images** | Reusable galleries (`images`) |
| **Video** | Reusable videos (`video`) |
| **Metadata (for SEO)** | Global SEO defaults per language (`metadata`) |

Extra tools:

- **Vision** — GROQ playground
- **Deploy Website** — triggers a static rebuild via `SANITY_STUDIO_DEPLOY_HOOK`

---

## Content model overview

A **Page** is a stack of **sections**, not one long rich-text field:

```
Page
└── sections[]
    ├── Text section
    ├── Quote section
    ├── Two-column text
    ├── Callout section
    ├── Image gallery          ← images inline on the section
    ├── Image gallery (shared) ← reference to an Images document
    ├── Video                  ← video inline on the section
    └── Video (shared)         ← reference to a Video document
```

Pages use **document-internationalization**: each language is its own document (own title, path, SEO, sections). Shared media documents stay in sync across translations; their alt/caption text uses `localeString` (`de` / `en`).

**Main Navigation** and **Metadata** are separate documents per language (field `language`). They are not linked via document-internationalization. Navigation is exposed as fixed Studio singletons; metadata is a normal document list.

---

## Documents

| Studio title | Schema name | Role |
| --- | --- | --- |
| Page | `page` | Page content + sections |
| Image | `singleImage` | Reusable single image |
| Images | `images` | Reusable gallery |
| Video | `video` | Reusable video |
| Main Navigation | `navigation` | Main menu |
| Metadata (for SEO) | `metadata` | Site-wide SEO defaults |

### Page (`page`)

| Field | Notes |
| --- | --- |
| **Title** | Internal/editorial title (required) |
| **SEO & page title** | Browser tab / SEO title |
| **Description (for SEO)** | Meta description |
| **Language** | `de` or `en` (required) |
| **Path** | URL path without language prefix, e.g. `about` or `blog/post-1` |
| **Is home** | Homepage flag; home pages must not have a path |
| **Studio group** | Studio organisation only (e.g. `docs`, `blog`) — does not affect URLs |
| **Sections** | Ordered list of section objects |

Path rules: lowercase letters, digits, hyphens, and `/`; unique per language. Non-home pages require a path.

### Image (`singleImage`)

| Field | Notes |
| --- | --- |
| **Title** | Internal Studio label |
| **Image** | Asset (required) |
| **Accessibility description** | `localeString` |
| **Caption** | `localeString` |

Used via the **Image (shared)** (`imageRef`) block inside section content.

### Images (`images`)

| Field | Notes |
| --- | --- |
| **Title** | Internal label |
| **Images** | Grid of images; each has `caption` / `alt` as `localeString` (min. 1) |

Referenced by **Image gallery (shared)**.

### Video (`video`)

| Field | Notes |
| --- | --- |
| **Title** | Required Studio label |
| **Video file** | `video/*` (required) |
| **Poster image** | Thumbnail before playback |
| **Caption** | `localeString` |
| **Accessibility description** | `localeString` |
| **Autoplay** | Default off |
| **Muted** | Default off |

Referenced by **Video (shared)** and by **Video reference** (`videoRef`) in text.

### Main Navigation (`navigation`)

| Field | Notes |
| --- | --- |
| **Title** | Internal name |
| **Language** | `de` / `en` (prefilled / read-only on the fixed singletons) |
| **Navigation items** | Recursive `navItem` list (max depth 3) |

#### Navigation item (`navItem`)

| Field | Notes |
| --- | --- |
| **Label** | Display text (required) |
| **Link** | Optional `navTarget`; empty = group label only |
| **Child items** | Nested `navItem`s |

#### Link target (`navTarget`)

| Field | Notes |
| --- | --- |
| **Link type** | `internal` (page) or `external` (URL) |
| **Page** | Page reference, same language (internal) |
| **Hash / anchor** | Optional, without `#` (internal) |
| **URL** | External address (`http`/`https`/`mailto`/`tel`) |
| **Open in new tab** | Optional |

The website builds internal URLs from `page.path` / `isHome` (`/{lang}` or `/{lang}/{path}`).

### Metadata (`metadata`)

| Field | Notes |
| --- | --- |
| **Title** | Brand / site context |
| **SEO Title** | Default SEO title |
| **Description** | Meta description (warning over 160 characters) |
| **Language** | `de` / `en` (required) |

Each page can still override SEO via its own `seoTitle` and `description`.

### Localized text (`localeString`)

Object with side-by-side **German** / **English** string fields. Used on shared media so one document can serve both languages with different alt/caption text.

---

## Page sections

| Studio title | Schema name | Fields / behaviour |
| --- | --- | --- |
| Text section | `textSection` | `content` (`sectionContent`) |
| Quote section | `quoteSection` | `content` (required, max 1 block) + optional **Attribution** |
| Two-column text | `twoColumnSection` | **Left column** / **Right column** (`sectionContent`) |
| Callout section | `calloutSection` | Optional **Title** + `content` |
| Image gallery | `gallerySection` | Inline image grid; per-image string `caption` / `alt` (min. 1) |
| Image gallery (shared) | `sharedGallerySection` | Required reference to an `images` document |
| Video | `videoSection` | Inline file, poster, caption, accessibility description, autoplay, muted |
| Video (shared) | `sharedVideoSection` | Required reference to a `video` document |

### Section content (`sectionContent`)

Portable Text used by text, quote, two-column, and callout sections:

- Styles: Normal, Heading 2, Heading 3
- Annotation: **Link** (`link` → `href`)
- Inline blocks: **Image (shared)** (`imageRef`), **Video reference** (`videoRef`)

---

## Images — how to embed

| Approach | Where | Data lives | Alt / caption | Use when |
| --- | --- | --- | --- | --- |
| Inline gallery | Section **Image gallery** | On the page section | Plain strings | Gallery only on this page/language |
| Shared gallery | **Image gallery (shared)** → **Images** | Shared `images` document | `localeString` | Same gallery on DE and EN (or multiple pages) |
| Shared image in text | **Image (shared)** in section content → **Image** | Shared `singleImage` document | `localeString` | One image in the text flow, kept in sync across translations |
| Asset upload | Any image field | Sanity asset | Depends on surrounding fields | Foundation for all of the above |

**Rule of thumb:** inline = belongs to this page version; shared = central source, page only references it.

---

## Videos — how to embed

| Approach | Where | Data lives | Caption / alt | Use when |
| --- | --- | --- | --- | --- |
| Inline video | Section **Video** | On the page section | Strings | One-off on this language page |
| Shared video | **Video (shared)** → **Video** | Shared `video` document | `localeString` | Same file/settings across languages or pages |
| Video in text | **Video reference** in section content | Shared `video` document | From the video document | Video inside the text flow |

---

## Quick chooser

| Situation | Use |
| --- | --- |
| Body text, quote, two columns, callout | Matching text/layout section |
| Gallery on one language page only | **Image gallery** (inline) |
| Same gallery on DE and EN | **Images** + **Image gallery (shared)** |
| Single image synced across translations | **Image** + **Image (shared)** in text |
| Video only here | **Video** section (inline) |
| Video across translations/pages | **Video** document + **Video (shared)** or `videoRef` |
| Menu | Main Navigation (per language) |
| Site-wide meta defaults | Metadata (per language) |
| Organise pages in the sidebar | **Studio group** |

---

## Deploy from the Studio

1. Open the **Deploy Website** tool
2. Click **Deploy now** (calls `SANITY_STUDIO_DEPLOY_HOOK`)
3. Optionally follow progress via `SANITY_STUDIO_VERCEL_LINK`

The site is statically built: published Sanity content appears online only after a successful deploy.
