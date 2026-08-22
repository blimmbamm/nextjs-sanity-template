import {defineType, defineField} from 'sanity'

export const videoType = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'file',
      title: 'Video file',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      description: 'Thumbnail shown before playback',
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
    }),

    defineField({
      name: 'alt',
      title: 'Accessibility description',
      type: 'string',
    }),

    defineField({
      name: 'autoplay',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'muted',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'poster',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
})
