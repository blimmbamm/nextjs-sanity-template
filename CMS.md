# CMS-Dokumentation

Überblick über das Sanity Content Studio in diesem Projekt: welche Inhalte du pflegen kannst und wie die Bausteine zusammenspielen.

Sprachen im Studio: **Deutsch (`de`)** und **Englisch (`en`)**.

---

## Studio-Aufbau

In der linken Sidebar findest du unter **Content**:

| Bereich | Inhalt |
|--------|--------|
| **Pages** | Alle Seiten, gruppiert nach Homepage / Studio-Gruppen / ungruppiert |
| **Image** | Einzelne wiederverwendbare Bilder (`singleImage`) |
| **Images** | Wiederverwendbare Bildergalerien |
| **Video** | Wiederverwendbare Videos |
| **Main Navigation** | Hauptnavigation pro Sprache (Singleton DE/EN, rekursive Items) |
| **Metadata (for SEO)** | Globale SEO-Metadaten pro Sprache |

Zusätzliche Tools im Studio:

- **Vision** – GROQ-Abfragen testen (eher für Entwickler)
- **Deploy Website** – löst einen Website-Build über den konfigurierten Deploy-Hook aus

---

## Grundprinzip: Seiten aus Abschnitten

Eine **Page** ist kein langer Fließtext-Editor, sondern eine **Liste von Sections**. Du stapelst Module untereinander; jede Section hat einen festen Zweck und feste Felder.

```
Page
└── sections[]
    ├── Text section
    ├── Quote section
    ├── Two-column text
    ├── Callout section
    ├── Image gallery          ← Bilder direkt in der Section
    ├── Image gallery (shared) ← Referenz auf ein Images-Dokument
    ├── Video                  ← Video direkt in der Section
    └── Video (shared)         ← Referenz auf ein Video-Dokument
```

### Felder einer Page

| Feld | Bedeutung |
|------|-----------|
| **Title** | Interner/redaktioneller Seitentitel (Pflicht) |
| **SEO & page title** | Titel für Browser-Tab / SEO |
| **Description (for SEO)** | Meta-Beschreibung |
| **Language** | `de` oder `en` (Pflicht) |
| **Path** | URL-Pfad ohne Sprachpräfix, z. B. `about` oder `blog/post-1` |
| **Is home** | Wenn aktiv: Startseite; dann **kein** Path erlaubt |
| **Studio group** | Nur für die Studio-Organisation (z. B. `docs`, `blog`) – beeinflusst URLs nicht |
| **Sections** | Inhalt der Seite als Abschnittsliste |

**Path-Regeln:** nur Kleinbuchstaben, Ziffern, Bindestriche und `/` (z. B. `about-us`, `blog/post-1`); pro Sprache eindeutig. Homepages haben keinen Path.

### Studio-Gruppen

Seiten mit gesetztem `studioGroup` erscheinen in der Sidebar unter dem jeweiligen Gruppennamen. Ohne Gruppe landen sie unter **Ungrouped pages**. Homepages haben einen eigenen Eintrag.

---

## Sprachen & Übersetzungen

### Seiten (`page`)

Seiten nutzen das Plugin **document-internationalization**. Pro Sprachversion gibt es ein eigenes Page-Dokument. Über die Studio-UI kannst du Übersetzungen anlegen und verknüpfen.

- Jede Sprachversion hat eigenen Titel, Path, SEO-Texte und **eigene Sections**.
- Medien, die über **Shared**-Sections referenziert werden, bleiben zwischen DE und EN synchron (Bildauswahl, Datei, Reihenfolge).
- Texte auf Shared-Dokumenten (Alt, Caption) sind lokalisiert (`localeString`: Felder `de` / `en`).

### Navigation & Metadata

**Main Navigation** und **Metadata** sind eigene Dokumente **pro Sprache** (Feld `language`). Sie sind nicht über document-internationalization gekoppelt – du pflegst DE und EN getrennt.

### `localeString` (lokalisierter Kurztext)

Auf Shared-Medien (`Image`, `Images`, `Video`) stehen Alt-Text und Caption als **zwei Felder nebeneinander** (Deutsch / Englisch). So kann ein gemeinsames Medien-Dokument von beiden Sprachseiten referenziert werden, ohne dass der Text in beiden Sprachen identisch sein muss.

Auf rein seitenlokalen Sections (`Image gallery`, `Video`) reichen einfache String-Felder – die ganze Section gehört ja schon zu einer Sprachversion der Page.

---

## Abschnitte (Sections) im Detail

### Text section

Portable Text mit:

- Normal, Heading 2, Heading 3
- Links (Annotation `link` mit `href`)
- optional eingefügte Blöcke: **Image (shared)** (`imageRef`) und **Video reference** (`videoRef`)

Geeignet für Fließtext und Inline-Medien im Textfluss.

### Quote section

Ein Zitatblock (max. ein Content-Block) plus optionale **Attribution** (Quelle/Autor).

### Two-column text

Zwei Spalten (`left` / `right`), jeweils mit demselben Content-Typ wie Text sections.

### Callout section

Optionaler **Title** plus Content – hervorgehobener Hinweis/Kasten.

### Image gallery / Image gallery (shared)

Siehe [Bilder](#bilder--wie-kann-ich-sie-einbinden).

### Video / Video (shared)

Siehe [Videos](#videos--wie-kann-ich-sie-einbinden).

---

## Bilder – wie kann ich sie einbinden?

Es gibt **vier** Wege. Die Wahl hängt davon ab, ob das Bild nur einmal vorkommt oder über Sprachversionen/Seiten hinweg synchron bleiben soll.

### Überblick

| Weg | Wo im Studio | Daten liegen … | Alt / Caption | Wann nutzen? |
|-----|--------------|----------------|---------------|--------------|
| **A – Inline-Galerie** | Section *Image gallery* | direkt auf der Page-Section | einfache Strings (pro Sprachseite) | Galerie nur auf **dieser** Seite / Sprachversion |
| **B – Shared-Galerie** | Section *Image gallery (shared)* → Dokument *Images* | im zentralen `images`-Dokument | `localeString` (de/en) | dieselbe Galerie auf DE **und** EN (oder mehreren Seiten) |
| **C – Shared Einzelbild im Text** | in Text-/Spalten-/Callout-Content: *Image (shared)* → Dokument *Image* | im zentralen `singleImage`-Dokument | `localeString` (de/en) | ein Bild im Fließtext, das über Übersetzungen synchron bleiben soll |
| **D – Asset-Upload** | über Sanity Media / Upload in jedem Image-Feld | als Asset in Sanity | je nach Feld drumherum | Grundlage für A–C; jedes Bild ist zuerst ein hochgeladenes Asset |

### A – Inline: *Image gallery*

1. Auf einer Page eine Section **Image gallery** hinzufügen.
2. Bilder direkt in das Grid-Array laden.
3. Pro Bild optional `caption` und `alt` als normalen Text setzen.

**Vorteil:** schnell, kein Extra-Dokument.  
**Nachteil:** DE- und EN-Seite haben jeweils eine eigene Kopie. Ändert man die Galerie auf Deutsch, ändert sich die englische nicht automatisch.

### B – Shared: *Image gallery (shared)* + Dokument *Images*

1. Unter **Images** ein Galerie-Dokument anlegen (Titel + Bilderliste).
2. Pro Bild `caption` und `alt` als **localeString** (de/en) pflegen.
3. Auf der Page die Section **Image gallery (shared)** wählen und das Galerie-Dokument referenzieren.

**Vorteil:** Bildauswahl und Reihenfolge einmal pflegen – alle referenzierenden Seiten (inkl. Übersetzungen) sehen dieselbe Galerie. Texte bleiben sprachspezifisch.  
**Nachteil:** ein zusätzliches Dokument; etwas mehr Klickaufwand.

### C – Shared Einzelbild: Dokument *Image* + *Image (shared)* im Text

1. Unter **Image** ein `singleImage`-Dokument anlegen: Asset, interner Titel, lokalisiertes Alt/Caption.
2. In einer Text-Section (oder Spalte/Callout) den Block **Image (shared)** einfügen und das Dokument referenzieren.

**Vorteil:** dasselbe Bild bleibt über Übersetzungen konsistent.  
**Wann nicht:** einmaliges Bild nur auf einer Seite – dann ist eine Galerie-Section oder (perspektivisch) ein reines Inline-Image oft einfacher. Aktuell ist das Einzelbild im Textfluss über die Shared-Referenz modelliert.

### D – Upload vs. Referenz (konzeptionell)

Unabhängig vom Schema-Weg läuft der Upload immer über Sanity Assets:

1. Du lädst eine Datei hoch (oder wählst ein vorhandenes Asset).
2. Das Schema speichert entweder das Image **inline** in der Section/Page oder als Teil eines **eigenständigen Dokuments**, das von Sections **referenziert** wird.

```
Inline (A)                         Shared (B / C)
─────────                          ──────────────
Page.sections[].images[]    vs.    Images / Image Dokument
  └─ asset                           └─ asset
                                       ↑
Page.sections[] ─────────────── reference
```

**Merksatz:** Inline = „gehört zu dieser Page-Version“. Shared = „zentrale Quelle, Page zeigt nur darauf“.

---

## Videos – wie kann ich sie einbinden?

Analog zu Bildern gibt es **inline** und **shared**, plus eine Referenz im Fließtext.

| Weg | Section / Block | Daten liegen … | Caption / Alt | Wann? |
|-----|-----------------|----------------|---------------|-------|
| **Inline-Video** | *Video* | direkt auf der Section | Strings | einmalig auf dieser Sprachseite |
| **Shared-Video** | *Video (shared)* → Dokument *Video* | zentrales Video-Dokument | `localeString` | gleiche Datei/Einstellungen auf DE+EN oder mehreren Seiten |
| **Video im Text** | *Video reference* (`videoRef`) in Section-Content | Referenz auf *Video*-Dokument | vom Video-Dokument | Video im Fließtext |

### Felder (inline und shared gleichartig)

| Feld | Bedeutung |
|------|-----------|
| **Video file** | Datei (`video/*`) |
| **Poster image** | Vorschaubild vor dem Abspielen |
| **Caption** | Bildunterschrift |
| **Accessibility description** | Alt-Text / barrierefreie Beschreibung |
| **Autoplay** | automatisch starten (Default: aus) |
| **Muted** | stumm (Default: aus) |

Beim Shared-Dokument gibt es zusätzlich einen Pflicht-**Title** zur Orientierung im Studio.

---

## Navigation

Dokumenttyp **Main Navigation** – ein Singleton **pro Sprache** (DE / EN) in der Sidebar unter *Main Navigation*.

| Feld | Bedeutung |
|------|-----------|
| **Title** | Interner Name |
| **Language** | `de` / `en` (bei Singleton-Dokumenten vorausgefüllt) |
| **Navigation items** | Rekursive Liste von **Navigation items** (max. 3 Ebenen) |

### Navigation item

Jedes Item hat:

| Feld | Bedeutung |
|------|-----------|
| **Label** | Anzeigetext (Pflicht) |
| **Link** | Optional – Ziel (`navTarget`). Ohne Link = reine Gruppe |
| **Child items** | Optionale Unterpunkte (wieder `navItem`, max. Tiefe 3) |

### Link target (`navTarget`)

| Feld | Bedeutung |
|------|-----------|
| **Link type** | `internal` (Page) oder `external` (URL) |
| **Page** | Referenz auf eine Page derselben Sprache (nur internal) |
| **Hash / anchor** | Optional, ohne `#` (nur internal) |
| **URL** | Externe Adresse (nur external) |
| **Open in new tab** | Optional |

Interne URLs leitet die Website aus `page.path` / `isHome` ab (`/{lang}` bzw. `/{lang}/{path}`). Externe Links im Fließtext bleiben über die Portable-Text-Annotation `link` möglich.

---

## Globale SEO-Metadaten

Dokumenttyp **Metadata (for SEO)** – ebenfalls pro Sprache.

| Feld | Bedeutung |
|------|-----------|
| **Title** | Seitentitel / Markenkontext |
| **SEO Title** | SEO-Titel |
| **Description** | Meta-Beschreibung (Warnung ab >160 Zeichen) |
| **Language** | `de` / `en` |

Zusätzlich hat **jede Page** eigene SEO-Felder (`seoTitle`, `description`) für seitenbezogene Overrides.

---

## Deploy aus dem Studio

Unter dem Tool **Deploy Website**:

1. Button **Deploy now** auslösen
2. Der Studio ruft den konfigurierten Deploy-Hook auf (`SANITY_STUDIO_DEPLOY_HOOK`)
3. Optional Fortschritt über den Vercel-Link verfolgen (`SANITY_STUDIO_VERCEL_LINK`)

Die Website ist statisch gebaut: Inhalte erscheinen online erst nach einem erfolgreichen Deploy (kein Live-Preview der Production-Seite allein durch Publish in Sanity).

---

## Entscheidungshilfe (kurz)

| Situation | Empfehlung |
|-----------|------------|
| Text, Zitat, zwei Spalten, Hinweis | passende Text-/Layout-Section |
| Galerie nur auf einer Sprachseite | *Image gallery* (inline) |
| Dieselbe Galerie auf DE und EN | *Images*-Dokument + *Image gallery (shared)* |
| Einzelnes Bild, über Übersetzungen synchron | *Image*-Dokument + *Image (shared)* im Text |
| Video nur hier | *Video*-Section (inline) |
| Video über Übersetzungen/Seiten hinweg | *Video*-Dokument + *Video (shared)* oder `videoRef` |
| Menüpunkt | Main Navigation (pro Sprache, rekursive Items) |
| Site-weite Meta-Defaults | Metadata (pro Sprache) |
| Seiten in der Sidebar ordnen | Feld *Studio group* |

---

## Dokumenttypen – Schnellreferenz

| Studio-Titel | Schema-Name | Rolle |
|--------------|-------------|-------|
| Page | `page` | Seiteninhalt + Sections |
| Image | `singleImage` | Wiederverwendbares Einzelbild |
| Images | `images` | Wiederverwendbare Galerie |
| Video | `video` | Wiederverwendbares Video |
| Main Navigation | `navigation` | Hauptmenü |
| Metadata (for SEO) | `metadata` | Globale SEO-Daten |

### Section-Typen auf Pages

| Studio-Titel | Schema-Name |
|--------------|-------------|
| Text section | `textSection` |
| Quote section | `quoteSection` |
| Two-column text | `twoColumnSection` |
| Callout section | `calloutSection` |
| Image gallery | `gallerySection` |
| Image gallery (shared) | `sharedGallerySection` |
| Video | `videoSection` |
| Video (shared) | `sharedVideoSection` |

---

## Hinweis zum alten Content-Modell

Im Repo liegen noch ältere Schema-Dateien (z. B. `blockContent`, `imageGallery`, `banner`, `columnText`). Sie sind **nicht** mehr im aktiven Schema registriert. Redaktionell relevant ist nur das Sections-Modell oben.
