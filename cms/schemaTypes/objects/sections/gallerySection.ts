import {ImagesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Inline image gallery — images live directly on this section. Simplest
 * default: each page translation edits its own copy, no shared document.
 * If the same gallery must stay in sync across translations, use
 * `sharedGallerySection` instead.
 */
export const gallerySectionType = defineType({
  name: 'gallerySection',
  title: 'Image gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {name: 'caption', type: 'string'},
            {name: 'alt', type: 'string'},
          ],
        },
      ],
      validation: (rule) => rule.min(1),
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {images: 'images'},
    prepare: ({images}) => ({
      title: `Image gallery (${images?.length || 0})`,
      media: images?.[0],
    }),
  },
})
