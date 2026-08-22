import {defineType, defineField} from 'sanity'

export const imageGalleryType = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
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
    prepare({images}) {
      return {
        title: `Gallery (${images?.length || 0} images)`,
      }
    },
  },
})
