import type { PageSection } from "./SectionRenderer";
import SectionShell from "./SectionShell";
import VideoPlayer from "./VideoPlayer";
import { resolveLocaleString } from "../../src/sanity/resolveLocaleString";

type Props = {
  section: Extract<PageSection, { _type: "sharedVideoSection" }>;
  lang: string;
};

/**
 * Video referencing a shared `video` document — the same file/settings
 * are reused (and stay in sync) across every page that references it.
 * Caption/alt text are localized on the referenced document, so they
 * still need resolving to the current language here.
 */
export default function SharedVideoSectionBlock({ section, lang }: Props) {
  const video = section.video;

  if (!video) {
    return null;
  }

  return (
    <SectionShell>
      <VideoPlayer
        url={video.videoUrl}
        poster={video.poster}
        caption={resolveLocaleString(video.caption, lang)}
        alt={resolveLocaleString(video.alt, lang)}
        autoplay={video.autoplay}
        muted={video.muted}
      />
    </SectionShell>
  );
}
