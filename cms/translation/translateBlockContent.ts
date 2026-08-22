import translateHeadlineWithDate from './translateHeadlineWithDate'
import translateImageGallery from './translateImageGallery'
import translatePortableTextBlock from './translatePortableTextBlock'
import translateTable from './translateTable'
import translateVideo from './translateVideo'

export default async function translateBlockContent(blocks: any[]) {
  return Promise.all(
    (blocks || []).map(async (block: any) => {
      switch (block._type) {
        case 'block':
          return translatePortableTextBlock(block)

        case 'imageGallery':
          return translateImageGallery(block)

        case 'video':
          return translateVideo(block)

        case 'table':
          return translateTable(block)

        case 'headlineWithDate':
          return translateHeadlineWithDate(block)

        // columnText often wraps blocks – recurse if needed
        case 'columnText':
          return block

        default:
          return block // untouched
      }
    }),
  )
}
