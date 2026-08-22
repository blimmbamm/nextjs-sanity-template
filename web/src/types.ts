import {
  ImageGallery,
  NavigationQueryResult,
  PageBySlugQueryResult,
} from "./sanity/types";

export type NavItemType = NonNullable<
  NonNullable<NavigationQueryResult>["items"]
>[number];

export type NavDropdownItemType = Extract<
  NavItemType,
  { _type: "navDropdown" }
>;

export type ImageGalleryImageType = NonNullable<ImageGallery["images"]>[number];

export type PageContent = NonNullable<
  NonNullable<PageBySlugQueryResult["page"]>["content"]
>;

export type VideoBlock = Extract<PageContent[number], { _type: "videoRef" }>;

export type ImagesType = Extract<PageContent[number], { _type: "imagesRef" }>;
