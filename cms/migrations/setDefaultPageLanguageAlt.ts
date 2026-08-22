import {defineMigration} from 'sanity/migrate'

export default defineMigration({
  title: 'Set default language on pages',
  documentTypes: ['page'],
  migrate: {
    document(doc) {
      const page = doc as typeof doc & {language?: string}

      if (!page.language) {
        page.language = 'de'
      }
    },
  },
})
