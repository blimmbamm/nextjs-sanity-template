import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Inline video — file and settings live directly on this section. Each
 * page translation edits its own copy. If the same video/settings must
 * stay in sync across translations, use `sharedVideoSection` instead.
 */
export const videoSectionType = defineType({
  name: 'videoSection',
  title: 'Video',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'file',
      title: 'Video file',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (rule) => rule.required(),
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
      type: 'string',
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
    select: {media: 'poster', caption: 'caption'},
    prepare: ({media, caption}) => ({
      title: caption || 'Video',
      media,
    }),
  },
})
