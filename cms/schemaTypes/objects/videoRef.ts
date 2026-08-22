import {defineField, defineType} from 'sanity'

export const videoRefType = defineType({
  name: 'videoRef',
  title: 'Video reference',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      type: 'reference',
      to: [{type: 'video'}],
    }),
  ],
  preview: {
    select: {title: 'video.title'},
    prepare: ({title}) => ({
      title: `Video: ${title}`,
    }),
  },
})
