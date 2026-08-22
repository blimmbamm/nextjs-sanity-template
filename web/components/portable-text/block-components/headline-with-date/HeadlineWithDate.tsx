import { HeadlineWithDate as HeadlineWithDateType } from "../../../../src/sanity/types";
import styles from "./HeadlineWithDate.module.css";

type Props = {
  data: HeadlineWithDateType;
};

export default function HeadlineWithDate({ data }: Props) {
  const { date, title } = data;

  return (
    <div className={styles.root}>
      <p className={styles.date}>{date}</p>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
