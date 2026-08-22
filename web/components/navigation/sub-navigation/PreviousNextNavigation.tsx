import Link from "next/link";
import { PageBySlugQueryResult } from "../../../src/sanity/types";
import styles from "./PreviousNextNavigation.module.css";

type Props = {
  pageData: PageBySlugQueryResult;
};

export default function PreviousNextNavigation({ pageData }: Props) {
  let previous = null;
  let next = null;

  const dropdownItems = pageData.page?.navContext?.dropdown?.items;

  if (dropdownItems) {
    const currentItemIndex = dropdownItems.findIndex(
      (item) => item.page?._ref === pageData.page?._id
    );

    previous = dropdownItems[currentItemIndex - 1] ?? null;
    next = dropdownItems[currentItemIndex + 1] ?? null;
  }

  if (!previous && !next) return null;

  return (
    <div className={styles.root}>
      {previous?.label && (
        <Link className={styles.link} href={previous?.slug ?? ""}>
          <div className={styles.label}>
            <span className={styles.arrow}>&larr;</span>
            <span> {previous?.label}</span>
          </div>
        </Link>
      )}
      <div style={{ flex: 1 }} />
      {next?.label && (
        <Link className={styles.link} href={next?.slug ?? ""}>
          <div className={styles.label}>
            <span>{next?.label} </span>
            <span className={styles.arrow}>&rarr;</span>
          </div>
        </Link>
      )}
    </div>
  );
}
