import extractPlainTextFromBlocks from './extractPlainTextFromBlocks'

function blocksFromSection(section: any): any[] {
  switch (section?._type) {
    case 'textSection':
    case 'quoteSection':
    case 'calloutSection':
      return section.content ?? []

    case 'twoColumnSection':
      return [...(section.left ?? []), ...(section.right ?? [])]

    default:
      return []
  }
}

export default function extractPlainTextFromSections(sections: any[]): string {
  return extractPlainTextFromBlocks(sections.flatMap(blocksFromSection))
}

export {extractPlainTextFromBlocks}
