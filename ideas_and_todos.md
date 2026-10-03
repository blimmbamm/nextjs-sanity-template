# Ideas & Todos

Zwei Listen für das Template: **Ideas** = mögliche Erweiterungen (mit Kontext), **Todos** = konkrete offene Arbeit.

---

## Ideas

### Kontaktformular

Statische Seiten können Formulare nicht selbst verarbeiten → externer Dienst oder dynamische API-Route.

| Option | Beschreibung | Wann |
|--------|--------------|------|
| **A – Extern** | POST an Formspree / Web3Forms / Getform | Minimal-Setup, kein Backend |
| **B – API-Route** | `app/api/contact/route.ts` + Resend/Postmark | Empfohlen für ernsthaftes Template |
| **C – mailto:** | — | Nicht empfohlen |

**Mit API-Route zusätzlich nötig:** Spam-Schutz (Honeypot + Turnstile), Rate Limiting, Validierung (Zod), DSGVO-Checkbox.

**Sanity:** `contactForm`-Block in `blockContent` — Felder, Empfänger, Erfolgs-/Fehlermeldungen, i18n-Texte.

### Metrics / Analytics

Eigenes Dashboard nicht bauen — externe Tools nutzen, im Studio verlinken.

| Bedarf | Tool |
|--------|------|
| Seitenaufrufe, Referrer, Länder | Plausible, Fathom oder Umami |
| Core Web Vitals | Vercel Speed Insights |
| Klick-Tracking (CTA, Nav) | Custom Events (`data-track="…"`) |
| Dashboard für Betreiber | Link/iframe im Sanity Studio (neben Deploy-Tool) |

**Weglassen:** Heatmaps, GA4 als Default, Events in Sanity speichern.

**Template:** Script nur laden wenn `NEXT_PUBLIC_ANALYTICS_*` gesetzt; Cookie-Banner nur bei aktivem Analytics.

### Weitere Features

**Hoch (fast immer)**

- Cookie-/Consent-Banner (Pflicht bei Analytics, Embeds, Formular-Diensten)
- Sitemap + `robots.txt` (aus Sanity-Pages generieren)
- Open Graph / Twitter Cards + JSON-LD
- Preview/Draft Mode (Entwürfe vor Deploy)
- Redirects (Sanity-Dokument oder `next.config`)

**Mittel (je nach Projekt)**

- Newsletter (Buttondown, Brevo — Embed/API)
- FAQ-Block + FAQ-Schema
- Team-/Standort-Block mit Karte (Consent beachten)
- Downloads (Sanity Asset + Klick-Event)
- Interne Suche ab ~20 Seiten (Pagefind, statisch)

**Nice-to-have**

- RSS-Feed (Blog/News)
- 404 mit Sanity-gesteuertem Text
- Security Headers (CSP etc.)
- Impressum/Datenschutz als Page-Templates
- Docs pro Kunde absichern (z. B. Cloudflare Access)
- Content-Updates per Revalidate-Route statt nur Deploy-Hook

### Offen / unklar

- Wie am besten den Footer verwalten?

---

## Todos

Legende: `[ ]` offen · `[~]` teilweise

- [ ] Skill bauen, der durch die Erstellung eines neuen Projekts auf Basis des Templates führt
- [ ] Umgang mit Vulnerabilities festlegen (npm audit, Dependabot/Renovate, regelmäßige Updates)
- [~] Sanity-Datasets: Rollen klar (production = live, development = Arbeit); `sync:prod-to-dev` prüfen; ggf. `dev→prod` klären
- [ ] Template-seitig: Setup-Skript (Vercel-/Sanity-CLI) + Deployment-Checkliste als Doku
- [ ] Probleme im docs-Projekt konkretisieren und beheben
- [ ] Im Studio ein „Hilfe“-Tool anlegen, das auf die gehostete Doku verlinkt
