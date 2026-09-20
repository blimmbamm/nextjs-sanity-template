import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Video that references a shared `video` document. Editing the file or
 * playback settings updates every page — DE and EN included — that
 * references it. Caption/alt text on the referenced document are
 * localized so they can still differ per language.
 */
export const sharedVideoSectionType = defineType({
  name: 'sharedVideoSection',
  title: 'Video (shared)',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{type: 'video'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'video.title', media: 'video.poster'},
    prepare: ({title, media}) => ({
      title: `Video (shared): ${title || 'Untitled'}`,
      media,
    }),
  },
})
