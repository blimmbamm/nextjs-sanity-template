import {defineType, defineField} from 'sanity'

/**
 * Shared video document, referenced (via `sharedVideoSection` or
 * `videoRef`) from one or more pages. `caption`/`alt` use `localeString`
 * so the same file/settings can be reused across page translations while
 * the text still differs per language. For a one-off video, prefer the
 * inline `videoSection` instead.
 */
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
      type: 'localeString',
    }),

    defineField({
      name: 'alt',
      title: 'Accessibility description',
      type: 'localeString',
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
