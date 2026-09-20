import type { LocaleString } from "./types";

/**
 * Resolve a `localeString` field (used on documents shared/referenced
 * across page translations, e.g. `singleImage`, `images`, `video`) to a
 * plain string for the given language. Falls back to German, then
 * English, so missing translations don't render as empty text.
 */
export function resolveLocaleString(
  value: LocaleString | null | undefined,
  lang: string,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const record = value as Record<string, string | undefined>;

  return record[lang] || record.de || record.en || undefined;
}
