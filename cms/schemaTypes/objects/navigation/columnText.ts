import {defineType} from 'sanity'

export const columnTextType = defineType({
  name: 'columnText',
  type: 'object',
  fields: [
    {
      name: 'col1',
      type: 'blockContent',
    },
    {
      name: 'col2',
      type: 'blockContent',
    },
  ],
  preview: {prepare: () => ({title: 'Column Text'})},
})
