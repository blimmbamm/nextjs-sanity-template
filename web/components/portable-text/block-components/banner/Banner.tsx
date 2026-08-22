import { Banner as BannerType } from "../../../../src/sanity/types";
import PortableTextRenderer from "../../renderer/PortableTextRenderer";
import styles from "./Banner.module.css";

type Props = {
  data: BannerType;
};
export default function Banner({ data }: Props) {
  return (
    <div className={styles.root}>
      {data.content && <PortableTextRenderer content={data.content} />}
    </div>
  );
}
