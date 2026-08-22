import { Table as TableType } from "../../../../src/sanity/types";
import styles from "./Table.module.css";

type Props = {
  data: TableType;
};

export default function Table({ data }: Props) {
  const { rows } = data;

  return (
    <table className={styles.root}>
      <tbody>
        {rows?.map((row) => (
          <tr key={row._key}>
            {row.cells?.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
