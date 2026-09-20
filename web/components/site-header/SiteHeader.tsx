import { client } from "../../src/sanity/client";
import { navigationQuery } from "../../src/sanity/queries";
import type { NavigationQueryResult } from "../../src/sanity/types";
import { SiteNav } from "./SiteNav";
import { toNavItems } from "./navTypes";
import styles from "./SiteHeader.module.css";

type Props = {
  lang: string;
};

export async function SiteHeader({ lang }: Props) {
  const navigation = await client.fetch<NavigationQueryResult>(
    navigationQuery,
    { lang },
    { cache: "force-cache" },
  );

  const items = toNavItems(navigation?.items ?? null);

  if (items.length === 0) {
    return null;
  }

  return (
    <header className={styles.header}>
      <SiteNav items={items} lang={lang} />
    </header>
  );
}
