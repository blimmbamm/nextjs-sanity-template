import {defineType, defineField} from 'sanity'

export const navDropdownType = defineType({
  name: 'navDropdown',
  title: 'Navigation Dropdown',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Dropdown label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Dropdown items',
      type: 'array',
      of: [{type: 'navDropdownItem'}],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'label'},
  },
})
