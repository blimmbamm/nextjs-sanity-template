import type { PageSection } from "./SectionRenderer";
import SectionShell from "./SectionShell";
import VideoPlayer from "./VideoPlayer";

type Props = {
  section: Extract<PageSection, { _type: "videoSection" }>;
};

/**
 * Inline video — file and playback settings live directly on this
 * section, so each page translation edits its own copy. See
 * `SharedVideoSection` for a video that stays in sync across
 * translations.
 */
export default function VideoSectionBlock({ section }: Props) {
  return (
    <SectionShell>
      <VideoPlayer
        url={section.videoUrl}
        poster={section.poster}
        caption={section.caption}
        alt={section.alt}
        autoplay={section.autoplay}
        muted={section.muted}
      />
    </SectionShell>
  );
}
