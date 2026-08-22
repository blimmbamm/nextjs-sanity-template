import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO & page title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description (for SEO)',
      type: 'text',
    }),

    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'German', value: 'de'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: async (value, context) => {
          const {document, getClient} = context
          const client = getClient({apiVersion: '2026-01-18'})

          if (!document?.language) return true

          const baseId = document._id.replace(/^drafts\./, '')

          const count = await client.fetch(
            `
              count(*[
                _type == "page" &&
                slug.current == $slug &&
                language == $language &&
                !(_id in [$id, "drafts." + $id])
              ])
            `,
            {
              slug: value,
              language: document.language,
              id: baseId,
            },
          )

          return count === 0
        },
      },
      validation: (rule) =>
        rule.custom((slug, context) => {
          if (context.document?.isHome && slug?.current) {
            return 'Home page must not have a slug'
          }
          return true
        }),
    }),

    defineField({
      name: 'isHome',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'showPrevNextNav',
      title: 'Show prev/next navigation?',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
    }),
  ],
})
