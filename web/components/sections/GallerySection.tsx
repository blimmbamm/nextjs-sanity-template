import type { PageSection } from "./SectionRenderer";
import SectionShell from "./SectionShell";
import ImageGallery from "../portable-text/block-components/image-gallery/ImageGallery";

type Props = {
  section: Extract<PageSection, { _type: "gallerySection" }>;
};

/**
 * Inline gallery — images live directly on this section, so each page
 * translation edits its own copy. See `SharedGallerySection` for a
 * gallery that stays in sync across translations.
 */
export default function GallerySectionBlock({ section }: Props) {
  if (!section.images?.length) {
    return null;
  }

  return (
    <SectionShell wide>
      <ImageGallery images={section.images} />
    </SectionShell>
  );
}
