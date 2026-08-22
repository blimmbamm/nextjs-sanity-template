"use client";

import { Menu, X } from "lucide-react";
import styles from "./MobileNav.module.css";
import { NavigationQueryResult } from "../../../src/sanity/types";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import Link from "next/link";
import { SITE_NAME } from "../../../src/environment";

type Props = {
  navQueryResult: NavigationQueryResult;
  lang: string;
};

export default function MobileNav({ navQueryResult, lang }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <div className={styles["title-container"]}>
          <Link
            href={`/${lang}`}
            className={styles.title}
            onNavigate={handleCloseDrawer}
          >
            {SITE_NAME}
          </Link>
        </div>
        {drawerOpen ? (
          <X
            className={styles["menu-toggle"]}
            strokeWidth={3}
            onClick={handleCloseDrawer}
          />
        ) : (
          <Menu
            className={styles["menu-toggle"]}
            strokeWidth={3}
            onClick={() => setDrawerOpen(true)}
          />
        )}
      </div>
      <MobileDrawer
        open={drawerOpen}
        navQueryResult={navQueryResult}
        onClose={handleCloseDrawer}
        lang={lang}
      />
    </div>
  );
}
