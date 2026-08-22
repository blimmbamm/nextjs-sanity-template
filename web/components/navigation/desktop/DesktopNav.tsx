"use client";

import { useState } from "react";
import { NavigationQueryResult } from "../../../src/types";
import styles from "./DesktopNav.module.css";
import NavItem from "./NavItem";
import { NavDropdownItemType } from "../../../src/types";
import NavMenu from "./NavMenu";
import Link from "next/link";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import { SITE_NAME } from "../../../src/environment";

type Props = {
  navQueryResult: NavigationQueryResult;
  lang: string;
};

export type NavDropdownState = {
  item: NavDropdownItemType;
  anchorEl: HTMLDivElement | null;
} | null;

export default function DesktopNav({ navQueryResult, lang }: Props) {
  const [selectedNavDropdown, setSelectedNavDropdown] =
    useState<NavDropdownState>(null);

  function handleSelectNavDropdown({
    item,
    anchorEl,
  }: NonNullable<NavDropdownState>) {
    setSelectedNavDropdown((prev) => {
      // if the clicked item is already open, close it
      if (prev?.item._key === item._key) {
        return null;
      }
      // otherwise, open it
      return { item, anchorEl };
    });
  }

  return (
    <div className={styles.root}>
      <Link href={`/${lang}`} className={styles.title}>
        {SITE_NAME}
      </Link>
      <div className={styles.menu}>
        {navQueryResult?.items?.map((item) => (
          <NavItem
            key={item._key}
            item={item}
            onClick={handleSelectNavDropdown}
            lang={lang}
          />
        ))}
        <LanguageSwitcher lang={lang} hoverAnimation languageAbbreviation />
        {selectedNavDropdown && (
          <NavMenu
            selectedNavDropdown={selectedNavDropdown}
            onClose={() => setSelectedNavDropdown(null)}
            lang={lang}
          />
        )}
      </div>
    </div>
  );
}
