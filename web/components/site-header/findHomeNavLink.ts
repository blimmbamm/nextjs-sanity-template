import {
  resolveNavHref,
  type NavTargetInput,
} from "../../src/routing/resolveNavHref";
import type { NavItemData } from "./navTypes";

export function findHomeNavLink(
  items: NavItemData[],
  lang: string,
): { label: string; href: string } {
  for (const item of items) {
    const href = resolveNavHref(item.link as NavTargetInput);
    if (item.link?.page?.isHome || href === `/${lang}`) {
      return {
        label: item.label?.trim() || (lang === "de" ? "Start" : "Home"),
        href: href ?? `/${lang}`,
      };
    }
  }

  return {
    label: lang === "de" ? "Start" : "Home",
    href: `/${lang}`,
  };
}
