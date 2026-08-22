import Link from "next/link";
import styles from "./Footer.module.css";
import { SITE_NAME } from "../../src/environment";

type Props = { lang: string };

export default function Footer({ lang }: Props) {
  return (
    <footer className={styles.footer}>
      <span>
        &copy; {new Date().getFullYear()} - {SITE_NAME}
      </span>
      <span className={styles["horizontal-divider"]}>|</span>
      <Link className={styles.link} href={`/${lang}/contact`}>
        {lang === "de" ? "Impressum und Kontakt" : "Legal notice and contact"}
      </Link>
    </footer>
  );
}
