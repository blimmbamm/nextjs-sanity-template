import {
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "./sanity/types";

/**
 * Shape shared by inline gallery images (`gallerySection`) and by images
 * resolved from a shared `images` document (`sharedGallerySection`), once
 * their localized alt/caption fields have been resolved to plain strings
 * for the current language.
 */
export type GalleryImage = {
  _key: string;
  asset?: SanityImageAssetReference | null;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
  alt?: string | null;
  caption?: string | null;
};
