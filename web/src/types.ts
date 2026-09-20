import {
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
  SectionContent,
} from "./sanity/types";

export type PageContent = SectionContent;

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

export type ImageGalleryImageType = GalleryImage;

export type VideoBlock = Extract<SectionContent[number], { _type: "videoRef" }>;
export type ImagesType = Extract<SectionContent[number], { _type: "imageRef" }>;
