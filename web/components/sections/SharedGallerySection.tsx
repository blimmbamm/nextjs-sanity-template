import type { PageSection } from "./SectionRenderer";
import SectionShell from "./SectionShell";
import ImageGallery from "../portable-text/block-components/image-gallery/ImageGallery";
import { resolveLocaleString } from "../../src/sanity/resolveLocaleString";
import type { GalleryImage } from "../../src/types";

type Props = {
  section: Extract<PageSection, { _type: "sharedGallerySection" }>;
  lang: string;
};

/**
 * Gallery referencing a shared `images` document — the same image set is
 * reused (and stays in sync) across every page that references it. Alt
 * text/captions are localized on the referenced document, so they still
 * need resolving to the current language here.
 */
export default function SharedGallerySectionBlock({ section, lang }: Props) {
  const images = section.gallery?.images;

  if (!images?.length) {
    return null;
  }

  const resolved: GalleryImage[] = images.map((image) => ({
    _key: image._key,
    asset: image.asset,
    hotspot: image.hotspot,
    crop: image.crop,
    alt: resolveLocaleString(image.alt, lang),
    caption: resolveLocaleString(image.caption, lang),
  }));

  return (
    <SectionShell wide>
      <ImageGallery images={resolved} />
    </SectionShell>
  );
}
