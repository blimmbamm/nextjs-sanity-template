# Template-Erweiterungen

Statisches Next.js + Sanity Template für informative Websites (kein Shop).

**Ausgangslage:** Seiten vollständig statisch (`dynamic = "error"`, `revalidate = false`). API Routes und Client-Scripts können optional ergänzt werden, ohne die Statik der Seiten zu brechen.

---

## 1. Kontaktformular

Statische Seiten können Formulare nicht selbst verarbeiten → externer Dienst oder dynamische API-Route.

| Option | Beschreibung | Wann |
|--------|--------------|------|
| **A – Extern** | POST an Formspree / Web3Forms / Getform | Minimal-Setup, kein Backend |
| **B – API-Route** | `app/api/contact/route.ts` + Resend/Postmark | Empfohlen für ernsthaftes Template |
| **C – mailto:** | — | Nicht empfohlen |

**Mit API-Route zusätzlich nötig:** Spam-Schutz (Honeypot + Turnstile), Rate Limiting, Validierung (Zod), DSGVO-Checkbox.

**Sanity:** `contactForm`-Block in `blockContent` — Felder, Empfänger, Erfolgs-/Fehlermeldungen, i18n-Texte.

---

## 2. Metrics / Analytics

Eigenes Dashboard nicht bauen — externe Tools nutzen, im Studio verlinken.

| Bedarf | Tool |
|--------|------|
| Seitenaufrufe, Referrer, Länder | Plausible, Fathom oder Umami |
| Core Web Vitals | Vercel Speed Insights |
| Klick-Tracking (CTA, Nav) | Custom Events (`data-track="…"`) |
| Dashboard für Betreiber | Link/iframe im Sanity Studio (neben Deploy-Tool) |

**Weglassen:** Heatmaps, GA4 als Default, Events in Sanity speichern.

**Template:** Script nur laden wenn `NEXT_PUBLIC_ANALYTICS_*` gesetzt; Cookie-Banner nur bei aktivem Analytics.

---

## 3. Weitere Features

### Hoch (fast immer)

- Cookie-/Consent-Banner (Pflicht bei Analytics, Embeds, Formular-Diensten)
- Sitemap + `robots.txt` (aus Sanity-Pages generieren)
- Open Graph / Twitter Cards + JSON-LD
- Preview/Draft Mode (Entwürfe vor Deploy)
- Redirects (Sanity-Dokument oder `next.config`)

### Mittel (je nach Projekt)

- Newsletter (Buttondown, Brevo — Embed/API)
- FAQ-Block + FAQ-Schema
- Team-/Standort-Block mit Karte (Consent beachten)
- Downloads (Sanity Asset + Klick-Event)
- Interne Suche ab ~20 Seiten (Pagefind, statisch)

### Nice-to-have

- RSS-Feed (Blog/News)
- 404 mit Sanity-gesteuertem Text
- Security Headers (CSP etc.)
- Impressum/Datenschutz als Page-Templates
- Auto-Deploy bei Publish (Webhook statt manuellem Deploy-Tool)

---

## 4. Architektur: Optionale Module

Features per Env-Flags aktivieren — Kern bleibt statisch:

```env
CONTACT_FORM_PROVIDER=resend|formspree|none
RESEND_API_KEY=...
TURNSTILE_SECRET_KEY=...

NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible|umami|none
NEXT_PUBLIC_ANALYTICS_DOMAIN=...
```

```
Sanity → Build → CDN (statisch)
                ↓
Browser → API Route (Formular, optional dynamisch)
        → Analytics Script (client-seitig)
```

---

## 5. Umsetzungs-Priorität

1. Sitemap + OG-Tags
2. Plausible/Umami + Studio-Link
3. Kontaktformular-Block + API-Route + Turnstile
4. Cookie-Banner (sobald Analytics/Formular aktiv)
5. Preview Mode
6. Rest nach Bedarf

---

## 6. Seiten-Architektur: Content-Modellierung

**Ist-Zustand:** `blockContent` — ein Portable-Text-Feld mit Custom Objects (`columnText`, `banner`, `imageGallery`, …). Redakteure schreiben in einem Fluss; Komponenten werden inline eingestreut.

**Frage:** Reicht das, oder braucht es eine andere Struktur für „frei gestaltbare“ Seiten?

### Option A – Sections/Modules (Alternative)

Seite = **Array von Section-Typen**, nicht ein einziges `blockContent`-Feld.

```
page
└── sections[]
    ├── heroSection
    ├── twoColumnSection
    ├── gallerySection
    └── ctaSection
```

Jede Section ist ein eigenes Schema-Objekt mit festen Feldern. Styling (Farben, Abstände, volle Breite) bestimmt das Frontend anhand des Section-Typs — nicht Sanity.

| Pro | Contra |
|-----|--------|
| Klares Mental Model („Module stapeln“) | Weniger natürlich für langen Fließtext |
| Layout-Controls pro Abschnitt möglich | Mehr Schema-Boilerplate |
| Bessere Studio-Previews pro Modul | Text „fließt“ nicht zwischen Sections |
| Einfacheres Frontend (1 Section = 1 Komponente) | Größeres Insert-Menü bei vielen Typen |

**Passt wenn:** Landing Pages, Marketing-Seiten, starkes Design-System mit wiederkehrenden Modulen.

### Option B – Hybrid (empfohlen bei gemischten Seiten)

Zwei Ebenen trennen: **Layout** (Sections) vs. **Inhalt** (`blockContent` innerhalb textlastiger Sections).

```
page
└── sections[]
    ├── heroSection              ← reines Layout-Modul
    ├── contentSection           ← enthält blockContent (Text + Inline-Blocks)
    ├── twoColumnSection         ← Layout-Modul
    └── ctaSection               ← reines Layout-Modul
```

| Ebene | Verantwortung | Beispiele |
|-------|---------------|-----------|
| **Sections** | Seitenstruktur, Layout, visuelle Module | Hero, CTA, Team, FAQ |
| **blockContent** (nested) | Fließtext + eingestreute Komponenten | Absätze, Galerie im Text, Tabelle |

**Passt wenn:** Mix aus Artikeln/Docs und Marketing-Seiten — typisch für informative Websites.

### Entscheidungshilfe

| Seitentyp | Empfehlung |
|-----------|------------|
| Blog, Docs, News, lange Artikel | `blockContent` (Ist-Zustand) |
| Landing Pages, starke Section-Layouts | Sections/Modules |
| Beides im selben Template | Hybrid |

### Migration bestehender Blöcke (Hybrid)

| Block | Als Inline-Block (`blockContent`) | Als Section |
|-------|-----------------------------------|-------------|
| `columnText` | ✓ (im Textfluss) | ✓ (eigenes Layout-Modul) |
| `banner` | ✓ | ✓ (mit Layout-Optionen sinnvoller) |
| `headlineWithDate` | ✓ (News/Blog) | — |
| `imageGallery`, `videoRef` | ✓ | ✓ |
| Hero, CTA, Team, FAQ | — | ✓ (nur als Section) |

### Regeln (unabhängig vom Modell)

- Nesting max. 1–2 Ebenen (`blockContent` in Section ja, in Block in Block eher nein)
- Ab ~15–20 Block-/Section-Typen: Insert-Menü gruppieren
- Studio-Previews (`components.preview`) für visuelle Orientierung
- Presentation Tool für echte Frontend-Vorschau



## 7. Sonstiges

- bestehende Komponenten hinzufügen (Video, Image und Image gallery)
- Image gallery als Liste von Images mit Referenz zu Image-Type oder eigenständige Liste?
- Beispiel-Implementierung je Komponente
- Wie am besten Navigation gestalten?
- Im Allgemeinen dieser neue Plan: Kein over-engineering von Sanity-Komponenten sondern einen Satz von Beispiel-Komponenten, da konkreter Anwendungsfall wahrscheinlich ohnehin custom Sachen braucht