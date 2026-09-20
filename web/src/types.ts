import {
  BlockContent,
  PageByPathQueryResult,
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "./sanity/types";

export type PageContent = BlockContent;

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

export type NavItemType = {
  _type: "navLink" | "navDropdown" | string;
  _key: string;
  label?: string | null;
  slug?: string | null;
  items?: Array<{
    _key: string;
    label?: string | null;
    slug?: string | null;
  }> | null;
};

export type NavDropdownItemType = Extract<NavItemType, { _type: "navDropdown" }>;

export type VideoBlock = Extract<BlockContent[number], { _type: "videoRef" }>;
export type ImagesType = Extract<BlockContent[number], { _type: "imagesRef" }>;

export type NavigationQueryResult = {
  items?: NavItemType[] | null;
} | null;

export type PageBySlugQueryResult = {
  page:
    | (NonNullable<PageByPathQueryResult> & {
        navContext?: {
          dropdown?: {
            items?: Array<{
              page?: { _ref?: string };
              label?: string | null;
              slug?: string | null;
            }> | null;
          } | null;
        } | null;
      })
    | null;
};
