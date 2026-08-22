import {
  BlockContent,
  ImageGallery,
  PageByPathQueryResult,
} from "./sanity/types";

export type PageContent = BlockContent;

export type ImageGalleryImageType = NonNullable<ImageGallery["images"]>[number];

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
