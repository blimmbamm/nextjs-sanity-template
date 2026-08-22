import {defineMigration, create} from 'sanity/migrate'
import translatePage from '../translation/translatePage'

export default defineMigration({
  title: 'Generate English translation of pages',
  documentTypes: ['page'],
  async *migrate(documents, context) {
    for await (const doc of documents()) {
      console.log(process.env.TRANSLATE_MODE)
      const translatedId = doc._id + '-en'

      const translationExists = Boolean(
        await context.client.fetch('count(*[_id == $id])', {id: translatedId}),
      )

      if (translationExists) {
        console.log(`translation exists already for id ${doc._id} `)
        continue
      }

      // Limit to one page temporary for testing:
      // if (doc._id !== '8ae92060-3686-4afa-bc4e-19aa30338a7b') continue
      if (doc._type !== 'page') continue
      if (doc.language === 'en') continue // skip already translated

      const translatedPage = process.env.TRANSLATE_MODE === 'mock' ? doc : await translatePage(doc)

      const newDoc = {
        ...translatedPage,
        _id: translatedId,
        language: 'en',
        title: `${translatedPage.seoTitle} (EN)`,
      }

      yield create(newDoc)
    }
  },
})
