import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "../../src/sanity/sanityImageUrl";
import styles from "./VideoPlayer.module.css";

type Props = {
  url?: string | null;
  poster?: SanityImageSource | null;
  caption?: string | null;
  alt?: string | null;
  autoplay?: boolean | null;
  muted?: boolean | null;
};

/**
 * Shared `<video>` presentation used by both the inline `videoSection`
 * and the reference-based `sharedVideoSection`.
 */
export default function VideoPlayer({
  url,
  poster,
  caption,
  alt,
  autoplay,
  muted,
}: Props) {
  if (!url) {
    return null;
  }

  return (
    <figure className={styles.container}>
      <video
        className={styles.media}
        src={url}
        controls
        preload="metadata"
        poster={poster ? urlFor(poster).width(1600).url() : undefined}
        muted={Boolean(muted)}
        autoPlay={Boolean(autoplay)}
        aria-label={alt || undefined}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
