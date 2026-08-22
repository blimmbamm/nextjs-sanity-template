import {defineType} from 'sanity'
import {blockStyles} from './blockContent'

export const bannerType = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'object',
  preview: {
    prepare: () => ({title: 'Banner'}),
  },
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block', styles: blockStyles}],
    },
  ],
})
