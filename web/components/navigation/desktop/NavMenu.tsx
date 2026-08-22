"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./NavMenu.module.css";
import Link from "next/link";
import { NavDropdownState } from "./DesktopNav";

type Props = {
  selectedNavDropdown: NonNullable<NavDropdownState>;
  onClose: () => void;
  lang: string;
};

export default function NavMenu({ selectedNavDropdown, onClose, lang }: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuPosition = useMemo(() => {
    const { top, left, height, width, bottom } =
      selectedNavDropdown?.anchorEl?.getBoundingClientRect() || {};
    return {
      top: (top && height && top + height) || "auto",
      left: (left && width && left + width / 2) || "auto",
      maxHeight: `calc(100dvh - ${bottom}px)`,
    };
  }, [selectedNavDropdown]);

  useEffect(() => {
    if (!selectedNavDropdown) return;

    function handleOutsideClick(e: PointerEvent) {
      e.stopPropagation();
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !selectedNavDropdown?.anchorEl?.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick, true);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick, true);
    };
  }, [selectedNavDropdown]);

  return (
    <div className={styles.root} style={{ ...menuPosition }} ref={menuRef}>
      <ul className={styles.items}>
        {selectedNavDropdown.item.items?.map((subItem) => (
          <li key={subItem._key}>
            {subItem.slug && (
              <Link
                href={`/${lang}/${subItem.slug}`}
                onNavigate={() => {
                  onClose();
                  window.scrollTo({ top: 0 });
                }}
                className={styles.link}
              >
                {subItem.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
