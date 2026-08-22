import { VideoBlock } from "../../../../src/types";
import styles from "./Video.module.css";

type Props = {
  data: VideoBlock;
};

export default function Video({ data }: Props) {
  const { url, caption, autoplay, muted } = data.video || {};

  if (!url) return null;

  return (
    <div className={styles.root}>
      <figure className={styles.container}>
        <video
          className={styles.media}
          src={url}
          controls
          preload="metadata"
          muted={Boolean(muted)}
          autoPlay={Boolean(autoplay)}
        ></video>
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
      </figure>
    </div>
  );
}
