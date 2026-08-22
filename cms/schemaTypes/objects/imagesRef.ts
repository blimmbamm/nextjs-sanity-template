import {defineField, defineType} from 'sanity'

export const imagesRefType = defineType({
  name: 'imagesRef',
  title: 'Images',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'reference',
      to: [{type: 'images'}],
    }),
  ],
  preview: {
    select: {title: 'images.title', images: 'images.images'},
    prepare: ({title, images}) => ({
      title: `Images: ${title} (${images?.length || 0})`,
    }),
  },
})
