"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { NavList } from "./NavList";
import { findHomeNavLink } from "./findHomeNavLink";
import type { NavItemData } from "./navTypes";
import styles from "./SiteHeader.module.css";

type Props = {
  items: NavItemData[];
  lang: string;
};

export function SiteNav({ items, lang }: Props) {
  const pathname = usePathname();
  const drawerId = useId();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const home = findHomeNavLink(items, lang);

  useEffect(() => {
    setDrawerOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <nav className={styles.desktop} aria-label="Main">
        <NavList items={items} pathname={pathname} depth={1} variant="desktop" />
      </nav>

      <div className={styles.mobileBar}>
        <Link href={home.href} className={styles.homeLink}>
          {home.label}
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <span className={styles.menuIcon} data-open={drawerOpen || undefined} />
        </button>
      </div>

      <div
        className={styles.drawerBackdrop}
        data-open={drawerOpen || undefined}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      <nav
        id={drawerId}
        className={styles.drawer}
        data-open={drawerOpen || undefined}
        aria-label="Main"
        aria-hidden={!drawerOpen}
      >
        <div className={styles.drawerHeader}>
          <Link
            href={home.href}
            className={styles.homeLink}
            onClick={() => setDrawerOpen(false)}
          >
            {home.label}
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <span className={styles.menuIcon} data-open />
          </button>
        </div>
        <NavList items={items} pathname={pathname} depth={1} variant="mobile" />
      </nav>
    </>
  );
}
