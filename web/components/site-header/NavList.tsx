import Link from "next/link";
import {
  isNavHrefActive,
  resolveNavHref,
  type NavTargetInput,
} from "../../src/routing/resolveNavHref";
import type { NavItemData } from "./navTypes";
import styles from "./SiteHeader.module.css";

type Props = {
  items: NavItemData[];
  pathname: string;
  depth: number;
  variant: "desktop" | "mobile";
};

function itemChildren(item: NavItemData): NavItemData[] {
  return item.children ?? [];
}

function isItemTreeActive(item: NavItemData, pathname: string): boolean {
  if (isNavHrefActive(pathname, resolveNavHref(item.link as NavTargetInput))) {
    return true;
  }

  return itemChildren(item).some((child) => isItemTreeActive(child, pathname));
}

export function NavList({ items, pathname, depth, variant }: Props) {
  return (
    <ul
      className={
        depth === 1
          ? variant === "desktop"
            ? styles.listRootDesktop
            : styles.listRootMobile
          : styles.listNested
      }
      data-depth={depth}
    >
      {items.map((item) => (
        <NavListItem
          key={item._key}
          item={item}
          pathname={pathname}
          depth={depth}
          variant={variant}
        />
      ))}
    </ul>
  );
}

function NavListItem({
  item,
  pathname,
  depth,
  variant,
}: {
  item: NavItemData;
  pathname: string;
  depth: number;
  variant: "desktop" | "mobile";
}) {
  const children = itemChildren(item);
  const href = resolveNavHref(item.link as NavTargetInput);
  const openInNewTab = Boolean(item.link?.openInNewTab);
  const active = isItemTreeActive(item, pathname);
  const isLink = Boolean(href);

  const labelClassName = [
    isLink ? styles.linkLabel : styles.groupLabel,
    active ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  const linkProps = openInNewTab
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const labelNode = href ? (
    item.link?.type === "external" ? (
      <a href={href} className={labelClassName} {...linkProps}>
        {item.label}
      </a>
    ) : (
      <Link href={href} className={labelClassName} {...linkProps}>
        {item.label}
      </Link>
    )
  ) : (
    <span className={labelClassName}>{item.label}</span>
  );

  if (children.length === 0) {
    return <li className={styles.item}>{labelNode}</li>;
  }

  if (variant === "mobile") {
    return (
      <li className={styles.item}>
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span className={styles.groupLabel}>{item.label}</span>
          </summary>
          {href ? (
            item.link?.type === "external" ? (
              <a href={href} className={styles.overviewLink} {...linkProps}>
                {item.label}
              </a>
            ) : (
              <Link href={href} className={styles.overviewLink} {...linkProps}>
                {item.label}
              </Link>
            )
          ) : null}
          <NavList
            items={children}
            pathname={pathname}
            depth={depth + 1}
            variant={variant}
          />
        </details>
      </li>
    );
  }

  return (
    <li className={`${styles.item} ${styles.hasChildren}`}>
      {labelNode}
      <NavList
        items={children}
        pathname={pathname}
        depth={depth + 1}
        variant={variant}
      />
    </li>
  );
}
