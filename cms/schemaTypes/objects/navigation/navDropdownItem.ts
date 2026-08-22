import {defineType, defineField} from 'sanity'

export const navDropdownItemType = defineType({
  name: 'navDropdownItem',
  title: 'Dropdown Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Item label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Target page',
      type: 'reference',
      to: [{type: 'page'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label'},
  },
})
