import {imagesType} from './documents/images'
import {metadataType} from './documents/metadata'
import {navigationType} from './documents/navigation'
import {pageType} from './documents/page'
import {videoType} from './documents/video'
import { bannerType } from './objects/banner'
import {blockContentType} from './objects/blockContent'
import {headlineWithDateType} from './objects/headlineWithDate'
import {imageGalleryType} from './objects/imageGallery'
import {imagesRefType} from './objects/imagesRef'
import {anchorAnnotation} from './objects/navigation/anchor'
import {columnTextType} from './objects/navigation/columnText'
import {linkAnnotation} from './objects/navigation/link'
import {navDropdownType} from './objects/navigation/navDropdown'
import {navDropdownItemType} from './objects/navigation/navDropdownItem'
import {navLinkType} from './objects/navigation/navLink'
import {videoRefType} from './objects/videoRef'

export const schemaTypes = [
  anchorAnnotation,
  linkAnnotation,
  pageType,
  blockContentType,
  columnTextType,
  imageGalleryType,
  navigationType,
  navLinkType,
  navDropdownType,
  navDropdownItemType,
  headlineWithDateType,
  metadataType,
  videoType,
  videoRefType,
  imagesType,
  imagesRefType,
  bannerType,
]
