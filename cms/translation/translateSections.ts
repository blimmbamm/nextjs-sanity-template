import translateBlockContent from './translateBlockContent'
import translateText from './translateText'

function translateSectionContent(content: unknown) {
  if (!Array.isArray(content)) {
    return content
  }

  return translateBlockContent(content)
}

export default async function translateSections(sections: any[]) {
  return Promise.all(
    (sections || []).map(async (section: any) => {
      switch (section._type) {
        case 'textSection':
          return {
            ...section,
            content: await translateSectionContent(section.content),
          }

        case 'quoteSection':
          return {
            ...section,
            content: await translateSectionContent(section.content),
            attribution: section.attribution
              ? await translateText(section.attribution)
              : section.attribution,
          }

        case 'twoColumnSection':
          return {
            ...section,
            left: await translateSectionContent(section.left),
            right: await translateSectionContent(section.right),
          }

        case 'calloutSection':
          return {
            ...section,
            title: section.title ? await translateText(section.title) : section.title,
            content: await translateSectionContent(section.content),
          }

        default:
          return section
      }
    }),
  )
}
