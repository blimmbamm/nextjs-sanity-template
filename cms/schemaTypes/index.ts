import {imageType} from './documents/image'
import {imagesType} from './documents/images'
import {metadataType} from './documents/metadata'
import {navigationType} from './documents/navigation'
import {pageType} from './documents/page'
import {videoType} from './documents/video'
import {imageRefType} from './objects/imageRef'
import {localeStringType} from './objects/localeString'
import {linkAnnotation} from './objects/navigation/link'
import {navItemType} from './objects/navigation/navItem'
import {navTargetType} from './objects/navigation/navTarget'
import {gallerySectionType} from './objects/sections/gallerySection'
import {sectionContentType} from './objects/sections/sectionContent'
import {
  calloutSectionType,
  quoteSectionType,
  textSectionType,
  twoColumnSectionType,
} from './objects/sections/sectionTypes'
import {sharedGallerySectionType} from './objects/sections/sharedGallerySection'
import {sharedVideoSectionType} from './objects/sections/sharedVideoSection'
import {videoSectionType} from './objects/sections/videoSection'
import {videoRefType} from './objects/videoRef'

export const schemaTypes = [
  linkAnnotation,
  pageType,
  sectionContentType,
  textSectionType,
  quoteSectionType,
  twoColumnSectionType,
  calloutSectionType,
  gallerySectionType,
  sharedGallerySectionType,
  videoSectionType,
  sharedVideoSectionType,
  navigationType,
  navItemType,
  navTargetType,
  metadataType,
  localeStringType,
  imageType,
  imageRefType,
  videoType,
  videoRefType,
  imagesType,
]
