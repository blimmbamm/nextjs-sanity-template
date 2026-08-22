"use client";

import Link from "next/link";
import { useRef } from "react";
import { NavItemType } from "../../../src/types";
import { NavDropdownState } from "./DesktopNav";
import styles from "./NavItem.module.css";
import { usePathname } from "next/navigation";

type Props = {
  item: NavItemType;
  onClick: ({ item, anchorEl }: NonNullable<NavDropdownState>) => void;
  lang: string;
};

export default function NavItem({ item, onClick, lang }: Props) {
  const navItemRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  function activeClassName() {
    switch (item._type) {
      case "navLink":
        return pathname === `/${lang}/${item.slug}` ? styles.active : "";
      case "navDropdown":
        return item.items
          ?.map(({ slug }) => `/${lang}/${slug}`)
          .includes(pathname)
          ? styles.active
          : "";
    }
  }

  return (
    <>
      {item._type === "navLink" && item.slug && (
        <Link
          href={`/${lang}/${item.slug}`}
          className={`${styles.root} ${styles["nav-link"]} ${activeClassName()}`}
        >
          {item.label}
        </Link>
      )}
      {item._type === "navDropdown" && (
        <div
          className={`${styles.root} ${activeClassName()}`}
          role="button"
          ref={navItemRef}
          onClick={() => onClick({ item, anchorEl: navItemRef.current })}
        >
          {item.label}
        </div>
      )}
    </>
  );
}
