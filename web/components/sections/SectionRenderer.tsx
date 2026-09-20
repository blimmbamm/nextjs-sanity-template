import {PageByPathQueryResult} from '../../src/sanity/types'
import CalloutSectionBlock from './CalloutSection'
import GallerySectionBlock from './GallerySection'
import QuoteSectionBlock from './QuoteSection'
import SharedGallerySectionBlock from './SharedGallerySection'
import SharedVideoSectionBlock from './SharedVideoSection'
import TextSectionBlock from './TextSection'
import TwoColumnSectionBlock from './TwoColumnSection'
import VideoSectionBlock from './VideoSection'

export type PageSection = NonNullable<
  NonNullable<PageByPathQueryResult>['sections']
>[number]

type Props = {
  sections: PageSection[] | null | undefined
  lang: string
}

export default function SectionRenderer({sections, lang}: Props) {
  if (!sections?.length) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'textSection':
            return <TextSectionBlock key={section._key} section={section} lang={lang} />

          case 'quoteSection':
            return <QuoteSectionBlock key={section._key} section={section} lang={lang} />

          case 'twoColumnSection':
            return <TwoColumnSectionBlock key={section._key} section={section} lang={lang} />

          case 'calloutSection':
            return <CalloutSectionBlock key={section._key} section={section} lang={lang} />

          case 'gallerySection':
            return <GallerySectionBlock key={section._key} section={section} />

          case 'sharedGallerySection':
            return (
              <SharedGallerySectionBlock key={section._key} section={section} lang={lang} />
            )

          case 'videoSection':
            return <VideoSectionBlock key={section._key} section={section} />

          case 'sharedVideoSection':
            return <SharedVideoSectionBlock key={section._key} section={section} lang={lang} />

          default:
            return null
        }
      })}
    </>
  )
}
