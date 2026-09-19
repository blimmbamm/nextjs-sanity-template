import {defineMigration, patch, at, set} from 'sanity/migrate'
import extractPlainTextFromSections from '../seo/extractPlainTextFromSections'
import generateSeoDescription from '../seo/generateSeoDescription'

export default defineMigration({
  title: 'Generate SEO descriptions for pages using AI',
  documentTypes: ['page'],

  async *migrate(documents) {
    for await (const doc of documents()) {
      // Skip if description already exists
      if (doc.description) continue

      if (!Array.isArray(doc.sections)) continue

      const text = extractPlainTextFromSections(doc.sections)

      // Skip empty or trivial content
      if (!text || text.length < 50) continue

      let description: string
      try {
        description = await generateSeoDescription(text)
      } catch (err) {
        console.error(`SEO generation failed for ${doc._id}`, err)
        continue
      }

      if (!description) continue

      yield patch(doc._id, [
        at('description', set(description)),
      ])
    }
  },
})
