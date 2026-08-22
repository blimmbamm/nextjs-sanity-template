import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.root}>
      <h2>This page does not exist.</h2>
      <Link className={styles.link} href="/">
        Back to home.
      </Link>
    </div>
  );
}
