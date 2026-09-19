import {PageByPathQueryResult} from '../../src/sanity/types'
import CalloutSectionBlock from './CalloutSection'
import QuoteSectionBlock from './QuoteSection'
import TextSectionBlock from './TextSection'
import TwoColumnSectionBlock from './TwoColumnSection'

export type PageSection = NonNullable<
  NonNullable<PageByPathQueryResult>['sections']
>[number]

type Props = {
  sections: PageSection[] | null | undefined
}

export default function SectionRenderer({sections}: Props) {
  if (!sections?.length) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'textSection':
            return <TextSectionBlock key={section._key} section={section} />

          case 'quoteSection':
            return <QuoteSectionBlock key={section._key} section={section} />

          case 'twoColumnSection':
            return <TwoColumnSectionBlock key={section._key} section={section} />

          case 'calloutSection':
            return <CalloutSectionBlock key={section._key} section={section} />

          default:
            return null
        }
      })}
    </>
  )
}
