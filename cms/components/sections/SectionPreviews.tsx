import {Box, Flex, Text} from '@sanity/ui'
import type {PreviewProps} from 'sanity'
import {SectionPreviewCard} from './SectionPreviewCard'
import {extractPreviewText} from './extractPreviewText'
import {useSectionPreviewValue} from './SectionPreviewContext'

function excerpt(
  blocks: Parameters<typeof extractPreviewText>[0],
  maxLength: number,
  fallback: string,
) {
  const text = extractPreviewText(blocks, maxLength)
  return text === 'Empty' ? fallback : text
}

export function TextSectionPreview(_props: PreviewProps) {
  const section = useSectionPreviewValue()

  return (
    <SectionPreviewCard label="Text section">
      <Text size={1} style={{lineHeight: 1.5}}>
        {excerpt(section?.content, 140, 'No content yet')}
      </Text>
    </SectionPreviewCard>
  )
}

export function QuoteSectionPreview(_props: PreviewProps) {
  const section = useSectionPreviewValue()
  const quote = excerpt(section?.content, 160, 'Add quote text…')

  return (
    <SectionPreviewCard label="Quote section">
      <Text size={1} style={{fontStyle: 'italic', textAlign: 'center', lineHeight: 1.5}}>
        “{quote}”
      </Text>
      <Text size={0} muted align="center" style={{marginTop: 8}}>
        {section?.attribution ? `— ${section.attribution}` : 'No attribution'}
      </Text>
    </SectionPreviewCard>
  )
}

export function TwoColumnSectionPreview(_props: PreviewProps) {
  const section = useSectionPreviewValue()

  return (
    <SectionPreviewCard label="Two columns">
      <Flex gap={3}>
        <Text size={1} style={{flex: 1, lineHeight: 1.45, minWidth: 0}}>
          {excerpt(section?.left, 70, 'Left column empty')}
        </Text>
        <Box
          style={{
            width: 1,
            alignSelf: 'stretch',
            background: 'var(--card-border-color)',
          }}
        />
        <Text size={1} muted style={{flex: 1, lineHeight: 1.45, minWidth: 0}}>
          {excerpt(section?.right, 70, 'Right column empty')}
        </Text>
      </Flex>
    </SectionPreviewCard>
  )
}

export function CalloutSectionPreview(_props: PreviewProps) {
  const section = useSectionPreviewValue()

  return (
    <SectionPreviewCard label="Callout section">
      <Box style={{borderLeft: '3px solid currentColor', paddingLeft: 12}}>
        <Text size={1} weight="semibold" style={{marginBottom: 6}}>
          {section?.title || 'Untitled callout'}
        </Text>
        <Text size={1} style={{lineHeight: 1.45}}>
          {excerpt(section?.content, 120, 'Add callout text…')}
        </Text>
      </Box>
    </SectionPreviewCard>
  )
}
