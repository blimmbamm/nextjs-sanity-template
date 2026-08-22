import {defineField, defineType} from 'sanity'

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
    select: {images: 'images', title: 'title'},
    prepare({images, title}) {
      return {
        title: `${title} images (${images?.length || 0})`,
      }
    },
  },
})
