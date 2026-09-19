import type {ObjectItemProps} from 'sanity'
import {SectionPreviewContext, type SectionPreviewContextValue} from './SectionPreviewContext'

function contextFromValue(value: Record<string, unknown>): SectionPreviewContextValue {
  return {
    content: value.content as SectionPreviewContextValue['content'],
    left: value.left as SectionPreviewContextValue['left'],
    right: value.right as SectionPreviewContextValue['right'],
    title: value.title as string | undefined,
    attribution: value.attribution as string | undefined,
  }
}

function SectionItemProvider(props: ObjectItemProps) {
  const value = props.value as Record<string, unknown>

  return (
    <SectionPreviewContext.Provider value={contextFromValue(value)}>
      {props.renderDefault(props)}
    </SectionPreviewContext.Provider>
  )
}

export const TextSectionItem = SectionItemProvider
export const QuoteSectionItem = SectionItemProvider
export const TwoColumnSectionItem = SectionItemProvider
export const CalloutSectionItem = SectionItemProvider
