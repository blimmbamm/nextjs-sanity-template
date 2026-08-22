import {at, defineMigration, patch, setIfMissing} from 'sanity/migrate'

export default defineMigration({
  title: 'Set SEO title on pages',
  documentTypes: ['page'],
  async *migrate(documents) {
    for await (const document of documents()) {
      yield patch(document._id, [at('seoTitle', setIfMissing(document.title))])
    }
  },
})
