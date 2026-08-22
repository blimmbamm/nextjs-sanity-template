import {at, defineMigration, patch, setIfMissing} from 'sanity/migrate'

export default defineMigration({
  title: 'Set default language on pages',
  documentTypes: ['page'],
  async *migrate(documents) {
    for await (const document of documents()) {
      yield patch(document._id, [at('language', setIfMissing('de'))])
    }
  },
})
