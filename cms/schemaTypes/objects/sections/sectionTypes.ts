import {BlockquoteIcon, BlockContentIcon, BulbOutlineIcon, SplitHorizontalIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {
  CalloutSectionItem,
  QuoteSectionItem,
  TextSectionItem,
  TwoColumnSectionItem,
} from '../../../components/sections/SectionItems'
import {
  CalloutSectionPreview,
  QuoteSectionPreview,
  TextSectionPreview,
  TwoColumnSectionPreview,
} from '../../../components/sections/SectionPreviews'

export const textSectionType = defineType({
  name: 'textSection',
  title: 'Text section',
  type: 'object',
  icon: BlockContentIcon,
  components: {
    item: TextSectionItem,
    preview: TextSectionPreview,
  },
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'sectionContent',
    }),
  ],
})

export const quoteSectionType = defineType({
  name: 'quoteSection',
  title: 'Quote section',
  type: 'object',
  icon: BlockquoteIcon,
  components: {
    item: QuoteSectionItem,
    preview: QuoteSectionPreview,
  },
  fields: [
    defineField({
      name: 'content',
      title: 'Quote',
      type: 'sectionContent',
      validation: (rule) => rule.required().max(1),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Optional source or author name.',
    }),
  ],
})

export const twoColumnSectionType = defineType({
  name: 'twoColumnSection',
  title: 'Two-column text',
  type: 'object',
  icon: SplitHorizontalIcon,
  fieldsets: [{name: 'columns', title: 'Columns', options: {columns: 2}}],
  components: {
    item: TwoColumnSectionItem,
    preview: TwoColumnSectionPreview,
  },
  fields: [
    defineField({
      name: 'left',
      title: 'Left column',
      type: 'sectionContent',
      fieldset: 'columns',
    }),
    defineField({
      name: 'right',
      title: 'Right column',
      type: 'sectionContent',
      fieldset: 'columns',
    }),
  ],
})

export const calloutSectionType = defineType({
  name: 'calloutSection',
  title: 'Callout section',
  type: 'object',
  icon: BulbOutlineIcon,
  components: {
    item: CalloutSectionItem,
    preview: CalloutSectionPreview,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'sectionContent',
    }),
  ],
})
