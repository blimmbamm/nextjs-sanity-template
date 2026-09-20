import {ImagesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Image gallery that references a shared `images` document. Editing the
 * image set (selection/order) updates every page — DE and EN included —
 * that references it. Alt text/captions on the referenced document are
 * localized so they can still differ per language.
 */
export const sharedGallerySectionType = defineType({
  name: 'sharedGallerySection',
  title: 'Image gallery (shared)',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{type: 'images'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'gallery.title', images: 'gallery.images'},
    prepare: ({title, images}) => ({
      title: `Image gallery (shared): ${title || 'Untitled'} (${images?.length || 0})`,
      media: images?.[0],
    }),
  },
})
