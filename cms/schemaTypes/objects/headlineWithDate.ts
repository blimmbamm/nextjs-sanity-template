import {defineType} from 'sanity'

export const headlineWithDateType = defineType({
  name: 'headlineWithDate',
  title: 'Headline with date (e.g. on News)',
  type: 'object',
  icon: () => 'i',
  preview: {
    select: {title: 'title', date: 'date'},
    prepare: ({date, title}) => ({title: `${date} - ${title}`}),
  },
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Headline',
      type: 'string',
    },
  ],
})
