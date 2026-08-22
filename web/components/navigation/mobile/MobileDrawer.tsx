import { useEffect, useState } from "react";
import { NavigationQueryResult } from "../../../src/sanity/types";
import { NavDropdownItemType } from "../../../src/types";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import MobileNavItem from "./MobileNavItem";
import styles from "./MobileDrawer.module.css";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

type Props = {
  open: boolean;
  navQueryResult: NavigationQueryResult;
  onClose: () => void;
  lang: string;
};

export default function MobileDrawer({
  open,
  navQueryResult,
  onClose,
  lang,
}: Props) {
  const [selectedDropdown, setSelectedDropdown] =
    useState<NavDropdownItemType | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedDropdown(null);
    }
  }, [open]);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""} `}>
      {!selectedDropdown && (
        <>
          {navQueryResult?.items?.map((item) => (
            <MobileNavItem
              key={item._key}
              item={item}
              onClick={(item) => setSelectedDropdown(item)}
              onCloseDrawer={onClose}
              lang={lang}
            />
          ))}
          <LanguageSwitcher lang={lang}/>
        </>
      )}
      {selectedDropdown && (
        <>
          <div className={styles["dropdown-back-container"]}>
            <MoveLeft onClick={() => setSelectedDropdown(null)} />
            <span>{selectedDropdown.label}</span>
          </div>
          {selectedDropdown.items?.map(
            (item) =>
              item.slug && (
                <Link
                  key={item._key}
                  href={`/${lang}/${item.slug}`}
                  className={styles.link}
                  onNavigate={onClose}
                >
                  {item.label}
                </Link>
              ),
          )}
        </>
      )}
    </div>
  );
}
