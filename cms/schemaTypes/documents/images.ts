import {defineField, defineType} from 'sanity'

/**
 * Shared image set, referenced via `sharedGallerySection` from one or more
 * pages. Because the same document is referenced from every page
 * translation, `alt`/`caption` use `localeString` so the image selection
 * stays in sync while the text can still differ per language. For a gallery
 * that only appears on a single page, prefer the inline `gallerySection`.

 */
export const imagesType = defineType({
  name: 'images',
  title: 'Images',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {name: 'caption', type: 'localeString'},
            {name: 'alt', type: 'localeString'},
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
    select: {images: 'images', title: 'title'},
    prepare({images, title}) {
      return {
        title: `${title} images (${images?.length || 0})`,
      }
    },
  },
})
